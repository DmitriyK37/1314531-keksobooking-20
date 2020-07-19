'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
