import {appStatus, userLoggedIn} from "./globalvars.js";

export function displayOnOffInputForm() {
    const inputForm = document.getElementById("input-form");
    const userName = document.getElementById("user-name");
    const progressBar = document.getElementById("adding-comment-progress");
    if(userLoggedIn.token !== "") {
        if (appStatus.doingSomething) {
            inputForm.style.display = "none";
            progressBar.style.display = "flex";
        } else {
            userName.value = userLoggedIn.name;
            inputForm.style.display = "flex";
            progressBar.style.display = "none";
        }
    } else {
        inputForm.style.display = "none";
        if(appStatus.doingSomething) {
            progressBar.style.display = "flex";
        } else {
            progressBar.style.display = "none";
        }
    }
}

export function switchButtonOn() {
    const buttonElement = document.getElementById("add-button");
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("add-form-button_disabled");
}

export function switchButtonOff() {
    const buttonElement = document.getElementById("add-button");
    buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add("add-form-button_disabled");
}
