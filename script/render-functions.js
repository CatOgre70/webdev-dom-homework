import {dateToString} from "./date-processing.js";
import {initCommentOnCommentListeners, initLikeButtonListeners} from "./listeners.js";
import {appStatus, commentsArray, setAppStatus, setCommentsArray} from "./globalvars.js";
import {getCommentList} from "./api.js";
import {responseCodeProcessing} from "./responseCodeProcessing.js";
import {userComment, userName} from "./renderApp.js";

export function renderCommentList(commentsList) {
    commentsList.innerHTML = commentsArray.map((comment, index) => {
        comment.text = comment.text.replaceAll("QUOTE_BEGIN", "<div class = 'quote'>");
        comment.text = comment.text.replaceAll("QUOTE_END", "</div>")
        comment.text = comment.text.replaceAll("AUTHOR_BEGIN", "<b>");
        comment.text = comment.text.replaceAll("AUTHOR_END", "</b><br>")
        return `<li class="comment" data-index="${index}">
                <div class="comment-header">
                  <div>${comment.author.name}</div>
                  <div>${dateToString(comment.date)}</div>
                </div>
                <div class="comment-body">
                  <div class="comment-text">
                    ${comment.text}
                  </div>
                </div>
                <div class="comment-footer">
                  <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
                  </div>
                </div>
              </li>`;
    }).join("");
    initLikeButtonListeners(commentsList);
    initCommentOnCommentListeners(commentsArray, userName, userComment);
}

export function renderCommentScreen(){
    return `<ul class="comments" id="comments-list">
        <!--        Список рендерится из JS-->
    </ul>
    <div class="add-form error-message" id="error-message-box">
        <!--        Сообщение об ошибке рендерится из JS-->
    </div>
    <div class="add-form" id="input-form">
        <input type="text" class="add-form-name" id="user-name" placeholder="Введите ваше имя" readonly/>
        <textarea type="textarea" class="add-form-text" id="user-comment" placeholder="Введите ваш коментарий" rows="4"></textarea>
        <div class="add-form-row">
            <button class="add-form-button" id="add-button">Написать</button>
        </div>
    </div>
    <div class="add-form" id="adding-comment-progress">
        <div class="comment-text">Комментарий добавляется...</div>
    </div>`;
}

export function fetchAndRenderCommentList() {
    const commentsList = document.getElementById("comments-list");
    if (appStatus.firstTimeScreenRender) {
        commentsList.innerHTML = '<li class="comment"><div class="comment-body"><div class="comment-text">Идет загрузка комментариев...</div></div></li>';
    }
    getCommentList().then((response) => {
        responseCodeProcessing(response);
        return response.json();
    }).then((responseData) => {
        setCommentsArray(responseData.comments);
        renderCommentList(commentsList, commentsArray, userName, userComment);
        if (appStatus.firstTimeScreenRender) {
            setAppStatus({firstTimeRender: false});
        }
    }).catch();
}
