import {appStatus, getErrorMessageByCode} from "./globalvars.js";
import {errorMessageBox} from "./renderApp.js";

export function renderAndSwitchOnErrorMessageBox()  {
    errorMessageBox.innerHTML = `<div class="comment-text">✕ ${getErrorMessageByCode(appStatus.responseStatus)}</div>`;
    errorMessageBox.style.display = "flex";
}

export function renderAndSwitchOnWarningMessageBox() {
    errorMessageBox.innerHTML = `<div class="comment-text">! Чтобы публиковать комментарии, авторизуйтесь, пожалуйста</div>`;
    errorMessageBox.style.display = "flex";
}

export function switchOffErrorMessageBox(){
    errorMessageBox.style.display = "none";
}

export function renderAndSwitchOnLoginErrorMessageBox()  {
    errorMessageBox.innerHTML = `<div class="comment-text">✕ ${getErrorMessageByCode(appStatus.responseStatus)}</div>`;
    errorMessageBox.style.display = "flex";
}

export function switchOffLoginErrorMessageBox() {
    errorMessageBox.style.display = "none";
}
