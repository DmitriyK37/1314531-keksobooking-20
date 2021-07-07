'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        formError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      formError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      formError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  // Отправка формы

  var formSuccess = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);
    var close = document.querySelector('.success');

    var closeSuccess = function (evt) {
      evt.preventDefault();
      if (evt.which === 1) {
        close.remove();
      }
      if (evt.key === 'Escape') {
        close.remove();
      }
      window.removeEventListener('click', closeSuccess);
      window.removeEventListener('keydown', closeSuccess);
    };
    window.addEventListener('click', closeSuccess);
    window.addEventListener('keydown', closeSuccess);
  };

  var formError = function (message) {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMessage);
    var error = document.querySelector('.error');
    var errorButton = errorMessage.querySelector('.error__button');
    var errorTextElement = errorMessage.querySelector('.error__message');

    if (message) {
      errorTextElement.textContent = message;
    }

    var closeError = function (evt) {
      evt.preventDefault();
      if (evt.which === 1) {
        error.remove();
      }
      if (evt.key === 'Escape') {
        error.remove();
      }
      window.removeEventListener('click', closeError);
      window.removeEventListener('keydown', closeError);
    };
    window.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
    window.addEventListener('keydown', closeError);
  };

  var upload = function (data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        formSuccess();
      } else {
        formError();
      }
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
