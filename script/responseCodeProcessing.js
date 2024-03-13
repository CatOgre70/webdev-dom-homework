import {appStatus, COMMENT_LIST_SCREEN, getErrorMessageByCode, LOGIN_SCREEN, setAppStatus} from "./globalvars.js";

export function responseCodeProcessing(response) {
    if(response.status === 400) {
        if(appStatus.screen === COMMENT_LIST_SCREEN) {
            setAppStatus({responseStatus: 400});
            throw new Error(getErrorMessageByCode(400));
        } else if(appStatus.screen === LOGIN_SCREEN) {
            setAppStatus({responseStatus: 401});
            throw new Error(getErrorMessageByCode(401));
        }
    } else if(response.status >= 500 && response.status < 600) {
        setAppStatus({responseStatus: 500});
        throw new Error(getErrorMessageByCode(500));
    } else if(response.status !== 200 && response.status !== 201) {
        setAppStatus({responseStatus: -1});
        throw new Error(getErrorMessageByCode(-1));
    }
}