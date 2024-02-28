import {errorMessageBox} from "./main.js";

export function renderAndSwitchOnErrorMessageBox(message)  {
    errorMessageBox.innerHTML = `<div class="comment-text">✕ ${message}</div>`
    errorMessageBox.style.display = "flex";
}

export function switchOffErrorMessageBox(){
    errorMessageBox.style.display = "none";
}
