// Список комментариев возвращается из API в следующем виде:
// {
// "comments": [
//    {
//      "id": 1,
//      "date": "2023-03-10T10:11:23.237Z",
//      "likes": 0,
//      "isLiked": false,
//      "text": "Это мой первый лайк",
//      "author": { "name": "Глеб Фокин" }
//    }
//  ]
// }
import {renderAndSwitchOnErrorMessageBox, switchOffErrorMessageBox} from "./message-box-functions.js";
import {
    displayOnOffInputForm,
    switchButtonOff,
    switchDeleteButtonOn
} from "./input-form-functions.js";
import {getCommentList, postComment} from "./api.js";
import {validateString} from "./security.js";
import {renderCommentList} from "./render-functions.js";
import {addAllEventListenersOnInputForm} from "./listeners.js";
import {errorMessageDisplay, responseCodeProcessing} from "./responseCodeProcessing.js";

export const buttonElement = document.getElementById("add-button");
export const deleteLastButtonElement = document.getElementById("delete-last-button");
const commentsList = document.getElementById("comments-list");
export const inputForm = document.getElementById("input-form");
export const progressBar = document.getElementById("adding-comment-progress");
const userName = document.getElementById("user-name");
const userComment = document.getElementById("user-comment");
export const errorMessageBox = document.querySelector(".error-message");
const userFieldsStatus = {
    userNameIsNotNull: false,
    userCommentIsNotNull: false
}
let commentsArray = [];
let firstCommentListFetchAndRender = true;
export let responseStatus = 0;

export function setResponseStatus(statusCode) {
    responseStatus = statusCode;
}

fetchAndRenderCommentList();
export let addingNewComment = false;

export function setAddingNewComment(isAdding) {
    addingNewComment = isAdding;
}

displayOnOffInputForm(inputForm, progressBar, addingNewComment);
addAllEventListenersOnInputForm(userName, userComment, buttonElement, deleteLastButtonElement,
    inputForm, commentsArray, commentsList, userFieldsStatus);
switchButtonOff(buttonElement);
// renderAndSwitchOnErrorMessageBox("Test");

// console.log("It works!");

export function addComment() {
    const newComment = {
        text: validateString(userComment.value),
        name: validateString(userName.value)
    };
    responseStatus = 0;
    switchOffErrorMessageBox();
    addingNewComment = true;
    displayOnOffInputForm(inputForm, progressBar, addingNewComment);
    postComment(newComment).then((response) => {
        responseCodeProcessing(response);
        return response.json();
    }).then(() => {
        return fetchAndRenderCommentList();
    }).then(() => {
        addingNewComment = false;
        displayOnOffInputForm(inputForm, progressBar, addingNewComment);
        userName.value = '';
        userComment.value = '';
        userFieldsStatus.userNameIsNotNull = false;
        userFieldsStatus.userCommentIsNotNull = false;
        switchButtonOff(buttonElement);
        if (commentsList.childElementCount === 1) {
            switchDeleteButtonOn(deleteLastButtonElement);
        }
    }).catch(() => {
        errorMessageDisplay();
        addingNewComment = false;
        displayOnOffInputForm(inputForm, progressBar, addingNewComment);
    });
}


function fetchAndRenderCommentList() {
    if (firstCommentListFetchAndRender) {
        commentsList.innerHTML = '<li class="comment"><div class="comment-body"><div class="comment-text">Идет загрузка комментариев...</div></div></li>';
    }
    return getCommentList().then((response) => {
        responseCodeProcessing(response);
        return response.json();
    }).then((responseData) => {
        commentsArray = responseData.comments;
        renderCommentList(commentsList, commentsArray, userName, userComment);
        if (firstCommentListFetchAndRender) {
            firstCommentListFetchAndRender = false;
        }
    });
}
