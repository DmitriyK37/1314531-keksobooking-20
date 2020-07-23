'use strict';

(function () {

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
      window.cart.createCard(element);
    });
    pinElement.addEventListener('keydown', function (evt) {
      var popup = document.querySelector('.popup');
      if (evt.key === 'Enter') {
        if (popup) {
          popup.remove();
        }
        window.cart.createCard(element);
      }
    });

    return pinElement;
  };

  var renderPins = function (pinList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinList.length; i++) {
      fragment.appendChild(createPin(pinList[i]));
    }
    pinListElement.appendChild(fragment);
  };

  var removePins = function () {
    var pins = window.move.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (el) {
      el.remove();
    });
    window.move.mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  window.pin = {
    createPin: createPin,
    renderPins: renderPins,
    removePins: removePins
  };
})();
