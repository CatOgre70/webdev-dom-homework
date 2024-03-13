export function loginScreenRender() {
    return `<div class="login-form" id="login-header">
                <div class="message-text">Пожалуйста авторизуйтесь</div>
            </div>
            <div class="login-form error-message" id="login-error-message-box">
                <!--        Сообщение об ошибке рендерится из JS-->
            </div>
            <div class="login-form" id="login-form">
                <input type="text" class="login-form-name" id="login-name" placeholder="Введите ваш идентификатор"/>
                <input type="password" class="login-form-text" id="login-comment" placeholder="Введите ваш пароль">
                <div class="login-form-row">
<!--                    <button class="cancel-form-button" id="cancel-button">Отмена</button>-->
                    <button class="login-form-button" id="login-button">Войти</button>
                </div>
            </div>
            <div class="login-form" id="auth-button">
                <div class="message-text">Еще не зарегистрированы?</div>
                <div class="login-form-row">
                    <button class="login-form-button" id="reg-button">Регистрация</button>
                </div>
            </div>
            <div class="login-form" id="login-progress">
                <div class="message-text">Пожалуйста подождите...</div>
            </div>`;
}