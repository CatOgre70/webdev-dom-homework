import {renderCommentList} from "./render-functions.js";
import {switchButtonOff, switchButtonOn, switchDeleteButtonOff} from "./input-form-functions.js";
import {addComment} from "./main.js";

export function initLikeButtonListeners(commentsList, commentsArray, userName, userComment) {
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

export function addAllEventListenersOnInputForm(userName, userComment, buttonElement, deleteLastButtonElement,
                                                inputForm, commentsArray, commentsList, userFieldsStatus) {

    userName.addEventListener("input", () => {
        // Enter key processing (deleting from the string)
        const charArray = userName.value.split("");
        if (charArray[charArray.length - 1] === "\n") {
            charArray.pop();
            if (charArray[charArray.length - 1] === "\r") {
                charArray.pop()
            }
            userName.value = charArray.join("");
        }
        userFieldsStatus.userNameIsNotNull = userName.value !== "";
        if (userFieldsStatus.userNameIsNotNull && userFieldsStatus.userCommentIsNotNull) {
            switchButtonOn(buttonElement);
        } else {
            switchButtonOff(buttonElement);
        }
    });

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

    deleteLastButtonElement.addEventListener('click', () => {
        if (commentsArray.length > 1) {
            commentsArray.pop();
        } else if (commentsArray.length === 1) {
            commentsArray.pop();
            switchDeleteButtonOff(deleteLastButtonElement);
        }
        renderCommentList(commentsList, commentsArray, userName, userComment);
    });
}

