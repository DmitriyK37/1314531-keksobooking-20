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
      inactivePin();
      activatePin(pinElement);
      window.cart.createCard(element);
    });
    pinElement.addEventListener('keydown', function (evt) {

      var popup = document.querySelector('.popup');
      if (evt.key === window.const.ENTER) {
        if (popup) {
          popup.remove();
        }
        inactivePin();
        activatePin(pinElement);
        window.cart.createCard(element);
      }
    });

    return pinElement;
  };

  var renderPins = function (pinList) {
    var fragment = document.createDocumentFragment();
    // for (var i = 0; i < pinList.length; i++) {
    //   fragment.appendChild(createPin(pinList[i]));
    // }
    pinList.forEach(function (element) {
      fragment.appendChild(createPin(element));
    });
    pinListElement.appendChild(fragment);
  };

  var removePins = function () {
    var pins = window.move.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (element) {
      element.remove();
    });
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  var stayMainPin = function () {
    window.move.mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
  };

  var inactivePin = function () {
    var activatedPinElement = map.querySelector('.map__pin--active');
    if (activatedPinElement) {
      activatedPinElement.classList.remove('map__pin--active');
    }
  };

  var activatePin = function (pinElement) {
    pinElement.classList.add('map__pin--active');
  };

  window.pin = {
    createPin: createPin,
    renderPins: renderPins,
    removePins: removePins,
    stayMainPin: stayMainPin,
    inactivePin: inactivePin,
    activatePin: activatePin
  };
})();
