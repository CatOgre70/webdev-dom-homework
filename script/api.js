// const baseUrl = "https://wedev-api.sky.pro/api/v1/vasily-demin/comments";
import {userLoggedIn} from "./globalvars.js";

const baseUrl = "https://wedev-api.sky.pro/api/v2/vasily-demin/comments";

/*
    Получить список комментариев
    адрес: /comments
    метод: GET
    Возвращает код 200 и список комментариев в формате JSON:
    {
      "comments": [
        {
          "id": "64253950ca1ce2a815a327cf",
          "date": "2023-03-30T07:25:04.020Z",
          "likes": 0,
          "isLiked": false,
          "text": "Буду первым",
          "author": {
            "id": "64226edb0cdb1574f162d950",
            "login": "admin",
            "name": "Глеб Админ"
          }
        }
      ]
    }
    В запросах без авторизации, флаг isLiked всегда false. Если сделать запрос с авторизацией, то флаг покажет лайкал ли текущий пользователь этот пост.
 */
export function getCommentList() {
    return fetch(baseUrl, {
        method: "GET"
    });
}

/*
    Добавить новый комментарий
    Апи работает только с авторизацией, подробнее читай в разделе "Авторизация"
    адрес: /comments
    метод: POST
    В теле запроса принимает объект комментария в формате JSON:
    { "text": "Текст коммента" }
    Возвращает код 201 и объект результата:
    { "result": "ok" }
    Возвращает код 400 и объект с ошибкой в формате JSON в следующих случаях
    Текст короче 3 символов
    В теле запроса не передан text
    В теле запроса передан не json
    Пример ответа с ошибкой:
    { "error": "text должен содержать хотя бы 3 символа" }
 */
export function postComment(newComment){
    return fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userLoggedIn.token}`,
        },
        body: JSON.stringify(newComment)
    });
}

/*
    Удалить комментарий
    Апи работает только с авторизацией, подробнее читай в разделе "Авторизация"
    Апи удаляет коммент
    адрес: /comments/:id
    Вместо :id нужно передать id комментария который нужно удалить
    метод: DELETE
    Возвращает код 201 и объект результата:
    { "result": "ok" }
 */
export function deleteComment(id) {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    });
}

/*
    Переключить лайк
    Апи работает только с авторизацией, подробнее читай в разделе "Авторизация"
    Апи переключает лайк, если комментарий был лайкнут текущим пользователем, то снимет лайк, если коммент не был лайкнут, то поставит.
    адрес: /comments/:id/toggle-like
    Вместо :id нужно передать id комментария которому нужно переключить лайк, например /comments/64253cdbca1ce2a815a327d3/toggle-like
    метод: POST
    Возвращает код 200 и объект результата c текущим количеством лайков и признаком залайканности:
    {
      "result": {
        "likes": 2,
        "isLiked": true
      }
    }
 */
export function toggleLike(id) {
    return fetch(`${baseUrl}/${id}/toggle-like`, {
        method: "POST"
    });
}