import {fetchAndRenderCommentList, renderCommentScreen} from "./render-functions.js";
import {displayOnOffInputForm, switchButtonOff, switchButtonOn} from "./input-form-functions.js";
import {addAllEventListenersOnInputForm} from "./listeners.js";
import {
    appStatus,
    COMMENT_LIST_SCREEN,
    LOGIN_SCREEN,
    REGISTRATION_SCREEN,
    setAppStatus,
    userInput, userLoggedIn
} from "./globalvars.js";
import {topMenuRender} from "./top-menu-render.js";
import {loginScreenRender} from "./login-screen-render.js";
import {initTopMenuListeners} from "./top-menu-listeners.js";
import {displayOnOffLoginForm, switchLoginButtonOff} from "./login-form-functions.js";
import {addAllEventListenersOnLoginForm} from "./login-screen-listeners.js";
import {renderAndSwitchOnWarningMessageBox} from "./message-box-functions.js";

export let errorMessageBox;
export let userName;
export let userComment;

export let userLoginName;
export let userPassword;

export function renderApp() {
    const appContainer = document.getElementById("app");
    const userFieldsStatus = {
        userNameIsNotNull: true,
        userCommentIsNotNull: false
    }

    if(appStatus.screen === COMMENT_LIST_SCREEN) {
        appContainer.innerHTML = renderCommentScreen();
        topMenuRender();
        initTopMenuListeners();
        userName = document.getElementById("user-name");
        userComment = document.getElementById("user-comment");
        errorMessageBox = document.querySelector(".error-message");
        fetchAndRenderCommentList();
        setAppStatus({doingSomething: false});
        displayOnOffInputForm();
        if(userLoggedIn.token !== "") {
            addAllEventListenersOnInputForm(userFieldsStatus);
        } else {
            renderAndSwitchOnWarningMessageBox();
        }
        if(!appStatus.firstTimeScreenRender && userFieldsStatus.userNameIsNotNull
            && userFieldsStatus.userCommentIsNotNull) {
            switchButtonOn();
        } else {
            switchButtonOff();
        }
    } else if(appStatus.screen === LOGIN_SCREEN) {
        appContainer.innerHTML = loginScreenRender();
        topMenuRender();
        initTopMenuListeners();
        userLoginName = document.querySelector(".login-form-name");
        userPassword = document.querySelector(".login-form-text");
        errorMessageBox = document.getElementById("login-error-message-box");
        userFieldsStatus.userNameIsNotNull = false;
        userFieldsStatus.userCommentIsNotNull = false;
        setAppStatus({doingSomething: false});
        displayOnOffLoginForm();
        switchLoginButtonOff();
        addAllEventListenersOnLoginForm(userFieldsStatus);
    } else if(appStatus.screen === REGISTRATION_SCREEN) {

    }
}