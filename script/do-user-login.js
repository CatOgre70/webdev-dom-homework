import {validateLoginName, validateUserPassword} from "./security.js";
import {appStatus, COMMENT_LIST_SCREEN, getErrorMessageByCode, setAppStatus, userLoggedIn} from "./globalvars.js";
import {
    renderAndSwitchOnLoginErrorMessageBox,
    switchOffLoginErrorMessageBox
} from "./message-box-functions.js";
import {displayOnOffLoginForm} from "./login-form-functions.js";
import {userLogin} from "./api-users.js";
import {responseCodeProcessing} from "./responseCodeProcessing.js";
import {renderApp} from "./renderApp.js";

export function doUserLogin() {
    const userLoginName = document.getElementById("login-name");
    const userPassword = document.getElementById("login-comment");
    const newUser = {
        login: validateLoginName(userLoginName.value),
        password: validateUserPassword(userPassword.value)
    };
    setAppStatus({responseStatus: 0, doingSomething: true});
    switchOffLoginErrorMessageBox();
    displayOnOffLoginForm();
    userLogin(newUser).then((response) => {
        responseCodeProcessing(response);
        return response.json();
    }).then((responseData) => {
        userLoggedIn.id = responseData.user.id;
        userLoggedIn.login = responseData.user.login;
        userLoggedIn.name = responseData.user.name;
        userLoggedIn.token = responseData.user.token;
        // console.log(`User token: ${userLoggedIn.token}`);
        // Reset field with password
        userPassword.value = "";
        setAppStatus({screen: COMMENT_LIST_SCREEN, doingSomething: false});
        renderApp();
    }).catch(() => {
        renderAndSwitchOnLoginErrorMessageBox(getErrorMessageByCode(appStatus.responseStatus));
        setAppStatus({doingSomething: false});
        displayOnOffLoginForm();
    });
}