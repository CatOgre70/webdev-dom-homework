import {responseStatus, setResponseStatus} from "./main.js";
import {renderAndSwitchOnErrorMessageBox} from "./message-box-functions.js";

export function responseCodeProcessing(response) {
    if(response.status === 400) {
        setResponseStatus(400);
        throw new Error("Response status 400");
    } else if(response.status >= 500 && response.status < 600) {
        setResponseStatus(500);
        throw new Error("Response status 500-599");
    } else if(response.status !== 200 && response.status !== 201) {
        setResponseStatus(-1);
        throw new Error("Unknown error");
    }
}

export function errorMessageDisplay() {
    if(responseStatus === 400){
        renderAndSwitchOnErrorMessageBox("Слишком короткие имя или комментарий, они должны быть минимум 3 символа!");
    } else if(responseStatus === 500){
        renderAndSwitchOnErrorMessageBox("Внутренняя ошибка сервера, попробуйте, пожалуйста, позже!");
    } else {
        renderAndSwitchOnErrorMessageBox("Кажется, у вас сломался Интернет, попробуйте, пожалуйста, позже!");
    }
}