### [Яндекс.Практикум](https://praktikum.yandex.ru), веб-факультет, поток 19
#### Курсовая работа по теме React, писалась в 3 подхода

# "Место"
## автор: Аркадий Флитман
------



Опубликован проект [вот здесь](https://konjvpaljto.github.io/react-mesto-auth/).

Цель проекта - освоить инструментарий React-а.

Технологии: React, CRA, React-Router, API.

Функциональность: можно регистрироваться, логиниться, менять информацию о пользователе, постить котиков и лайкать котиков. (Котики - это самое главное!)

Для деплоя на GH-Pages использован [вот этот](https://github.com/rafgraph/spa-github-pages) проект, спасибо большое его автору и моему коллеге-студенту [Борису](https://github.com/ooohrayyy/), который нашёл решение проблемы и поделился им.

* 1-й подход: перенос [вот этого](https://github.com/konjvpaljto/mesto) проекта на Реакт. Реализована часть функционала. Информация получается с сервера, отрисовывается (но пока что не передаётся). Попапы работают.
* 2-й подход: доработка проекта. Создание контекста, его использование (что за пользователь, права на редактирование своих карточек). Функционал лайков, добавления и удаления карточек, редактирование профиля и аватара.
* 3-й подход: добавление авторизации (через внешний API), её реализация через маршрутизацию при помощи React Router
* самостоятельная доработка: адаптация для мобильных, анимация "гамбургерного" меню, попап подтверждения удаления карточки

В планах на доработку:
* Валидация форм и полей форм
* Индикаторы загрузки во время ожидания API
* Переработать не загружающиеся картинки, сделать решение вместо бэкграунда
