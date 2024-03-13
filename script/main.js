// Список комментариев возвращается из API в следующем виде:
// {
// "comments": [
//    {
//      "id": 1,
//      "date": "2023-03-10T10:11:23.237Z",
//      "likes": 0,
//      "isLiked": false,
//      "text": "Это мой первый лайк",
//      "author": { "name": "Глеб Фокин" }
//    }
//  ]
// }
import {COMMENT_LIST_SCREEN, setAppStatus} from "./globalvars.js";
import {renderApp} from "./renderApp.js";

setAppStatus({screen: COMMENT_LIST_SCREEN,
    firstTimeScreenRender: true, doingSomething: false, responseStatus: 0});
renderApp();

