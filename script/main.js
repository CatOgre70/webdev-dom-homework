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
import {getCommentList, putComment} from "./api.js";
import {validateString} from "./security.js";
import {renderCommentList} from "./render-functions.js";
import {addAllEventListenersOnInputForm} from "./listeners.js";

const baseUrl = "https://wedev-api.sky.pro/api/v1/vasily-demin/comments";
const buttonElement = document.getElementById("add-button");
const deleteLastButtonElement = document.getElementById("delete-last-button");
const commentsList = document.getElementById("comments-list");
const inputForm = document.getElementById("input-form");
const progressBar = document.getElementById("adding-comment-progress");
const userName = document.getElementById("user-name");
const userComment = document.getElementById("user-comment");
const errorMessageBox = document.querySelector(".error-message");
const userFieldsStatus = {
    userNameIsNotNull: false,
    userCommentIsNotNull: false
}
let commentsArray = [];
let firstCommentListFetchAndRender = true;
let responseStatus = 0;

fetchAndRenderCommentList();
let addingNewComment = false;
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
    switchOffErrorMessageBox(errorMessageBox);
    addingNewComment = true;
    displayOnOffInputForm(inputForm, progressBar, addingNewComment);
    putComment(baseUrl, newComment).then((response) => {
        if(response.status === 400) {
            responseStatus = 400;
            throw new Error("Response status 400");
        } else if(response.status >= 500 && response.status < 600) {
            responseStatus = 500;
            throw new Error("Response status 500-599");
        } else if(response.status !== 200 && response.status !== 201) {
            responseStatus = -1;
            throw new Error("Unknown error");
        }
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
        if(responseStatus === 400){
            renderAndSwitchOnErrorMessageBox(errorMessageBox, "Слишком короткие имя или комментарий, они должны быть минимум 3 символа!");
        } else if(responseStatus === 500){
            renderAndSwitchOnErrorMessageBox(errorMessageBox,"Внутренняя ошибка сервера, попробуйте, пожалуйста, позже!");
        } else {
            renderAndSwitchOnErrorMessageBox(errorMessageBox, "Неизвестная ошибка, попробуйте, пожалуйста, позже!");
        }
        addingNewComment = false;
        displayOnOffInputForm(inputForm, progressBar, addingNewComment);
    });
}


function fetchAndRenderCommentList() {
    if (firstCommentListFetchAndRender) {
        commentsList.innerHTML = '<li class="comment"><div class="comment-body"><div class="comment-text">Идет загрузка комментариев...</div></div></li>';
    }
    return getCommentList(baseUrl).then((response) => {
        if(response.status === 400) {
            throw new Error("Response status 400");
        } else if(response.status >= 500 && response.status < 600) {
            throw new Error("Response status 500-599");
        } else if(response.status !== 200 && response.status !== 201) {
            throw new Error("Unknown error");
        }
        return response.json();
    }).then((responseData) => {
        commentsArray = responseData.comments;
        renderCommentList(commentsList, commentsArray, userName, userComment);
        if (firstCommentListFetchAndRender) {
            firstCommentListFetchAndRender = false;
        }
    });
}
