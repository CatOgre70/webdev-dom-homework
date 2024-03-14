import {appStatus, COMMENT_LIST_SCREEN, LOGIN_SCREEN, REGISTRATION_SCREEN} from "./globalvars.js";

export function topMenuRender() {
    const headerContainer = document.querySelector(".header-container");
    if(appStatus.screen === COMMENT_LIST_SCREEN) {
        headerContainer.innerHTML =
            `<div class = header-box>
                <div class="header-logo">Проект комментарии</div>
                <div class="header-menu">
                    <button class="top-menu-button" id="menu1">Регистрация</button>
                    <button class="top-menu-button" id="menu2">Войти</button>
                </div>
            </div>`;
    } else if(appStatus.screen === LOGIN_SCREEN) {
        headerContainer.innerHTML =
            `<div class = header-box>
                <div class="header-logo">Проект комментарии</div>
                <div class="header-menu">
                    <button class="top-menu-button" id="menu1">На главную</button>
                    <button class="top-menu-button" id="menu2">Регистрация</button>
                </div>
            </div>`;
    } else if(appStatus.screen === REGISTRATION_SCREEN) {
        headerContainer.innerHTML =
            `<div class = header-box>
                <div class="header-logo">Проект комментарии</div>
                <div class="header-menu">
                    <button class="top-menu-button" id="menu1">На главную</button>
                    <button class="top-menu-button" id="menu2">Войти</button>
                </div>
            </div>`;
    }
}