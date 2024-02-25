export function renderAndSwitchOnErrorMessageBox(errorMessageBox, message)  {
    errorMessageBox.innerHTML = `<div class="comment-text">✕ ${message}</div>`
    errorMessageBox.style.display = "flex";
}

export function switchOffErrorMessageBox(errorMessageBox){
    errorMessageBox.style.display = "none";
}
