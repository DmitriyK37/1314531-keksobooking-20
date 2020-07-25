'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinListElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (element) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinPicture = pinElement.querySelector('img');
    pinPicture.src = element.author.avatar;
    pinPicture.alt = element.offer.title;
    pinElement.style.left = (element.location.x - window.const.WIDTH_PIN / 2) + 'px';
    pinElement.style.top = (element.location.y - window.const.HEIGHT_PIN) + 'px';

    // Создание карточек
    pinElement.addEventListener('click', function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      inactive();
      activatePin(pinElement);
      window.card.create(element);
    });

    pinElement.addEventListener('keydown', function (evt) {
      var popup = document.querySelector('.popup');
      if (evt.key === window.const.ENTER) {
        if (popup) {
          popup.remove();
        }
        inactive();
        activatePin(pinElement);
        window.card.create(element);
      }
    });

    return pinElement;
  };

  var render = function (pinList) {
    var fragment = document.createDocumentFragment();
    pinList.forEach(function (element) {
      fragment.appendChild(createPin(element));
    });
    pinListElement.appendChild(fragment);
  };

  var remove = function () {
    var pins = window.move.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (element) {
      element.remove();
    });
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  var stayMain = function () {
    window.move.mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
  };

  var inactive = function () {
    var activatedPinElement = map.querySelector('.map__pin--active');
    if (activatedPinElement) {
      activatedPinElement.classList.remove('map__pin--active');
    }
  };

  var activatePin = function (pinElement) {
    pinElement.classList.add('map__pin--active');
  };

  window.pin = {
    render: render,
    remove: remove,
    stayMain: stayMain,
    inactive: inactive,
  };
})();
