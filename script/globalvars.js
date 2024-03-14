export const COMMENT_LIST_SCREEN = 0;
export const LOGIN_SCREEN = 1;
export const REGISTRATION_SCREEN = 2;

export const appStatus = {
    screen: COMMENT_LIST_SCREEN,
    firstTimeScreenRender: true,
    doingSomething: false,
    responseStatus: 0,
}

export function setAppStatus({screen, firstTimeScreenRender, doingSomething, responseStatus}){
    if(screen !== undefined) {
        appStatus.screen = screen;
    }
    if(doingSomething !== undefined) {
        appStatus.doingSomething = doingSomething;
    }
    if(firstTimeScreenRender !== undefined) {
        appStatus.firstTimeScreenRender = firstTimeScreenRender;
    }
    if(responseStatus !== undefined) {
        appStatus.responseStatus = responseStatus;
    }
}

export let commentsArray = [];

export function setCommentsArray(newArray) {
    commentsArray = newArray;
}

export const errorMessagesArray = [
    {
        responseStatusCode: -1,
        message: 'Кажется, у вас сломался Интернет, попробуйте, пожалуйста, позже!'
    },
    {
        responseStatusCode: 0,
        message: 'Что это?'
    },
    {
        responseStatusCode: 200,
        message: 'All things are going smoothly :)'
    },
    {
        responseStatusCode: 400,
        message: 'Слишком короткие имя или комментарий, они должны быть минимум 3 символа!'
    },
    {
        responseStatusCode: 401,
        message: 'Неправильный логин или пароль! Попробуйте еще раз!'
    },
    {
        responseStatusCode: 500,
        message: 'Внутренняя ошибка сервера, попробуйте, пожалуйста, позже!'
    },
]

export function getErrorMessageByCode(code) {
    let isFound = false;
    let indexFound = -1;
    for(let i = 0; i < errorMessagesArray.length; i++) {
        if(code === errorMessagesArray[i].responseStatusCode) {
            isFound = true;
            indexFound = i;
            break;
        }
    }
    if(isFound) {
        return errorMessagesArray[indexFound].message;
    } else {
        const msg = `Such error code ${code} was not found in the errorMessageArray[]`;
        console.error(msg);
        throw new Error(msg);
    }
}

export const userInput = {
    userName: "admin",
    userComment: "some comment",
    userLoginName: "admin",
    userPassword: "admin"
}

export const userLoggedIn = {
    id: 0,
    login: "",
    password: "",
    name: "",
    token: ""
}

export let userList = [];

export function setUserList(newUserList) {
    userList = newUserList;
}