import {dateToString} from "./date-processing.js";
import {initCommentOnCommentListeners, initLikeButtonListeners} from "./listeners.js";

export function renderCommentList(commentsList, commentsArray, userName, userComment) {
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
    initLikeButtonListeners(commentsList, commentsArray, userName, userComment);
    initCommentOnCommentListeners(commentsArray, userName, userComment);
}
