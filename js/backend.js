'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };

  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

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
        close.classList.add('hidden');
      }
      if (evt.key === 'Escape') {
        close.classList.add('hidden');
      }
      window.removeEventListener('click', closeSuccess);
      window.removeEventListener('keydown', closeSuccess);
    };
    window.addEventListener('click', closeSuccess);
    window.addEventListener('keydown', closeSuccess);
  };

  var formError = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMessage);
    var error = document.querySelector('.error');
    var errorButton = errorMessage.querySelector('.error__button');

    var closeError = function (evt) {
      evt.preventDefault();
      if (evt.which === 1) {
        error.classList.add('hidden');
      }
      if (evt.key === 'Escape') {
        error.classList.add('hidden');
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
