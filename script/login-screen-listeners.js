import {userComment, userName} from "./renderApp.js";
import {switchLoginButtonOff, switchLoginButtonOn} from "./login-form-functions.js";
import {doUserLogin} from "./do-user-login.js";

export function addAllEventListenersOnLoginForm(userFieldsStatus) {
    const buttonElement = document.getElementById("login-button");
    const inputForm = document.getElementById("login-form");
    const userLoginName = document.getElementById("login-name");
    const userPassword = document.getElementById("login-comment");
    userLoginName.addEventListener("input", () => {
        // Enter key processing (deleting from the string)
        const charArray = userLoginName.value.split("");
        if (charArray[charArray.length - 1] === "\n") {
            charArray.pop();
            if (charArray[charArray.length - 1] === "\r") {
                charArray.pop()
            }
            userLoginName.value = charArray.join("");
        }
        userFieldsStatus.userNameIsNotNull = userLoginName.value !== "";
        if (userFieldsStatus.userNameIsNotNull && userFieldsStatus.userCommentIsNotNull) {
            switchLoginButtonOn();
        } else {
            switchLoginButtonOff();
        }
    });

    userPassword.addEventListener("input", () => {
        // Enter key processing (deleting from the string)
        const charArray = userPassword.value.split("");
        if (charArray[charArray.length - 1] === "\n") {
            charArray.pop();
            if (charArray[charArray.length - 1] === "\r") {
                charArray.pop()
            }
            userPassword.value = charArray.join("");
        }
        userFieldsStatus.userCommentIsNotNull = userPassword.value !== "";
        if (userFieldsStatus.userNameIsNotNull && userFieldsStatus.userCommentIsNotNull) {
            switchLoginButtonOn();
        } else {
            switchLoginButtonOff();
        }
    });

    buttonElement.addEventListener("click", () => {
        doUserLogin();
    });

    inputForm.addEventListener('keyup', (e) => {
        if (e.code === "Enter" && userFieldsStatus.userNameIsNotNull && userFieldsStatus.userCommentIsNotNull && userLoginName.value !== "" && userPassword.value !== "") {
            doUserLogin();
        }
    });

}