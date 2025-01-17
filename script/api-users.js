const baseUrl = "https://wedev-api.sky.pro/api/user";

/*
    Получить список пользователей
    адрес: https://wedev-api.sky.pro/api/user
    метод: GET
    Возвращает код 200 и список зарегистрированных в системе пользователей в формате JSON:
    {
      "users": [
        {
          "id": 1,
          "login": "admin",
          "name": "Админ Глеб"
        }
      ]
    }
 */
export function getUserList() {
    return fetch(baseUrl, {
        method: "GET"
    });
}

/*
    Зарегистрироваться
    Создает нового пользователя в системе.
    адрес: https://wedev-api.sky.pro/api/user
    метод: POST
    В теле запроса принимает объект пользователя в формате JSON:
    {
      "login": "glebka",
      "name": "Глеб Фокин",
      "password": "123456"
    }
    Возвращает код 201 и зарегистрированного пользователя
    {
      "user": {
        "id": 1,
        "login": "glebka",
        "password": "123456",
        "name": "Глеб Фокин",
        "token": "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck"
      }
    }
    Возвращает код 400, если пользователь с таким логином уже существует
 */
export function newUserRegistration(newUser){
    return fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(newUser)
    });
}

/*
    Авторизует пользователя и возвращает Bearer токен авторизации
    адрес: https://wedev-api.sky.pro/api/user/login
    метод: POST
    В теле запроса принимает логин и пароль в формате JSON:
    {
      "login": "glebka",
      "password": "123456"
    }
    Возвращает код 201 и данные пользователя если авторизация прошла успешно
    {
      "user": {
        "id": 1,
        "login": "glebka",
        "password": "123456",
        "name": "Глеб Фокин",
        "token": "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck"
      }
    }
    Возвращает код 400, если были передан неправильный логин или пароль
 */
export function userLogin(loginPassword) {
    return fetch(`${baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify(loginPassword)
    });
}