import {renderCommentList} from "./render-functions.js";
import {switchButtonOff, switchButtonOn} from "./input-form-functions.js";
import {addComment} from "./addComment.js";
import {userComment, userName} from "./renderApp.js";
import {commentsArray} from "./globalvars.js";

export function initLikeButtonListeners(commentsList) {
    const likeButtonsList = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtonsList) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (commentsArray[likeButton.dataset.index].isLiked) {
                commentsArray[likeButton.dataset.index].isLiked = false;
                commentsArray[likeButton.dataset.index].likes--;
            } else {
                commentsArray[likeButton.dataset.index].isLiked = true;
                commentsArray[likeButton.dataset.index].likes++;
            }
            renderCommentList(commentsList, commentsArray, userName, userComment);
        });
    }
}

export function initCommentOnCommentListeners(commentsArray, userName, userComment) {
    const commentsList = document.querySelectorAll(".comment");
    for (const comment of commentsList) {
        comment.addEventListener('click', () => {
            const previousCommentUserName = `AUTHOR_BEGIN${commentsArray[comment.dataset.index].author.name}AUTHOR_END`;
            let previousCommentText = commentsArray[comment.dataset.index].text;
            // Delete previous citation, if exists
            if(previousCommentText.startsWith("<div class = \'quote\'>")) {
                const lastIndexOfCitation = previousCommentText.lastIndexOf("</div>");
                previousCommentText = previousCommentText.substring(lastIndexOfCitation + 7);
            }
            userName.value = "";
            userComment.value = `QUOTE_BEGIN${previousCommentUserName}\n${previousCommentText}QUOTE_END\n`;
        });
    }
}

export function addAllEventListenersOnInputForm(userFieldsStatus) {
    const buttonElement = document.getElementById("add-button");
    const inputForm = document.getElementById("input-form");

    userComment.addEventListener("input", () => {
        // Enter key processing (deleting from the string)
        const charArray = userComment.value.split("");
        if (charArray[charArray.length - 1] === "\n") {
            charArray.pop();
            if (charArray[charArray.length - 1] === "\r") {
                charArray.pop()
            }
            userComment.value = charArray.join("");
        }
        userFieldsStatus.userCommentIsNotNull = userComment.value !== "";
        if (userFieldsStatus.userNameIsNotNull && userFieldsStatus.userCommentIsNotNull) {
            switchButtonOn(buttonElement);
        } else {
            switchButtonOff(buttonElement);
        }
    });

    buttonElement.addEventListener("click", () => {
        addComment();
    });

    inputForm.addEventListener('keyup', (e) => {
        if (e.code === "Enter" && userFieldsStatus.userNameIsNotNull && userFieldsStatus.userCommentIsNotNull && userName.value !== "" && userComment.value !== "") {
            addComment();
        }
    });

}

