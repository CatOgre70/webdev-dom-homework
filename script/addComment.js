import {validateString} from "./security.js";
import {appStatus, getErrorMessageByCode, setAppStatus, userLoggedIn} from "./globalvars.js";
import {renderAndSwitchOnErrorMessageBox, switchOffErrorMessageBox} from "./message-box-functions.js";
import {displayOnOffInputForm, switchButtonOff} from "./input-form-functions.js";
import {postComment} from "./api.js";
import {responseCodeProcessing} from "./responseCodeProcessing.js";
import {fetchAndRenderCommentList} from "./render-functions.js";

export function addComment() {
    const buttonElement = document.getElementById("add-button");
    const inputForm = document.getElementById("input-form");
    const progressBar = document.getElementById("adding-comment-progress");
    const userComment = document.getElementById("user-comment");
    const newComment = {
        name: userLoggedIn.name,
        text: validateString(userComment.value),
    };
    const userFieldsStatus = {
        userNameIsNotNull: false,
        userCommentIsNotNull: false
    }
    setAppStatus({responseStatus: 0, doingSomething: true});
    switchOffErrorMessageBox();
    displayOnOffInputForm();
    postComment(newComment).then((response) => {
        responseCodeProcessing(response);
        return response.json();
    }).then(() => {
        return fetchAndRenderCommentList();
    }).then(() => {
        setAppStatus({doingSomething: false});
        displayOnOffInputForm(inputForm, progressBar);
        userComment.value = '';
        userFieldsStatus.userNameIsNotNull = true;
        userFieldsStatus.userCommentIsNotNull = false;
        switchButtonOff(buttonElement);
    }).catch(() => {
        renderAndSwitchOnErrorMessageBox(getErrorMessageByCode(appStatus.responseStatus));
        setAppStatus({doingSomething: false});
        displayOnOffInputForm(inputForm, progressBar);
    });
}
