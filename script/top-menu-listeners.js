import {
    appStatus,
    COMMENT_LIST_SCREEN,
    LOGIN_SCREEN,
    REGISTRATION_SCREEN,
    setAppStatus,
    userInput
} from "./globalvars.js";
import {renderApp, userComment, userName} from "./renderApp.js";

export function initTopMenuListeners() {
    const menuButton1 = document.getElementById("menu1");
    const menuButton2 = document.getElementById("menu2");
    if(appStatus.screen === COMMENT_LIST_SCREEN) {
        menuButton1.addEventListener("click", () => {
            userInput.userName = document.getElementById("user-name").value;
            userInput.userComment = document.getElementById("user-comment").value;
            setAppStatus({screen: REGISTRATION_SCREEN,
                firstTimeScreenRender: false, doingSomething: false, responseStatus: 0});
            renderApp();
        });
        menuButton2.addEventListener("click", () => {
            userInput.userName = document.getElementById("user-name").value;
            userInput.userComment = document.getElementById("user-comment").value;
            setAppStatus({screen: LOGIN_SCREEN,
                firstTimeScreenRender: false, doingSomething: false, responseStatus: 0});
            renderApp();
        });
    } else if(appStatus.screen === LOGIN_SCREEN) {
        menuButton1.addEventListener("click", () => {
            setAppStatus({screen: COMMENT_LIST_SCREEN,
                firstTimeScreenRender: false, doingSomething: false, responseStatus: 0});
            renderApp();
        });
        menuButton2.addEventListener("click", () => {
            setAppStatus({screen: REGISTRATION_SCREEN,
                firstTimeScreenRender: false, doingSomething: false, responseStatus: 0});
            renderApp();
        });
    } else if(appStatus.screen === REGISTRATION_SCREEN) {
        menuButton1.addEventListener("click", () => {
            setAppStatus({
                screen: COMMENT_LIST_SCREEN,
                firstTimeScreenRender: false, doingSomething: false, responseStatus: 0
            });
            renderApp();
        });
        menuButton2.addEventListener("click", () => {
            setAppStatus({
                screen: LOGIN_SCREEN,
                firstTimeScreenRender: false, doingSomething: false, responseStatus: 0
            });
            renderApp();
        });
    }
}