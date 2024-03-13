import {appStatus} from "./globalvars.js";

export function displayOnOffLoginForm() {
    const loginHeader = document.getElementById("login-header");
    const loginForm = document.getElementById("login-form");
    const authButton = document.getElementById("auth-button");
    const progressBar = document.getElementById("login-progress");
    if (appStatus.doingSomething) {
        loginHeader.style.display = "none";
        loginForm.style.display = "none";
        authButton.style.display = "none";
        progressBar.style.display = "flex";
    } else {
        loginHeader.style.display = "flex";
        loginForm.style.display = "flex";
        authButton.style.display = "flex";
        progressBar.style.display = "none";
    }
}

export function switchLoginButtonOn() {
    const buttonElement = document.getElementById("login-button");
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("add-form-button_disabled");
}

export function switchLoginButtonOff() {
    const buttonElement = document.getElementById("login-button");
    buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add("add-form-button_disabled");
}