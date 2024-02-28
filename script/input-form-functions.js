import {addingNewComment, buttonElement, deleteLastButtonElement, inputForm, progressBar} from "./main.js";

export function displayOnOffInputForm() {
    if (addingNewComment) {
        inputForm.style.display = "none";
        progressBar.style.display = "flex";
    } else {
        inputForm.style.display = "flex";
        progressBar.style.display = "none";
    }
}

export function switchButtonOn() {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("add-form-button_disabled");
}

export function switchButtonOff() {
    buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add("add-form-button_disabled");
}

export function switchDeleteButtonOn() {
    deleteLastButtonElement.removeAttribute("disabled");
    deleteLastButtonElement.classList.remove("delete-form-button_disabled");
}

export function switchDeleteButtonOff() {
    deleteLastButtonElement.setAttribute("disabled", "");
    deleteLastButtonElement.classList.add("delete-form-button_disabled");
}
