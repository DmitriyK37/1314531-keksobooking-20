'use strict';

(function () {

  // var type = [
  //   'palace',
  //   'flat',
  //   'house',
  //   'bungalo'
  // ];

  // var check = [
  //   '12:00',
  //   '13:00',
  //   '14:00'
  // ];

  // var features = [
  //   'wifi',
  //   'dishwasher',
  //   'parking',
  //   'washer',
  //   'elevator',
  //   'conditioner'
  // ];

  // var title = [
  //   'Дворец',
  //   'Квартира',
  //   'Дом',
  //   'Бунгало'
  // ];

  // var description = [
  //   'удобное расположение',
  //   'улучшенная инфраструктура',
  //   'просторная планировка квартир',
  //   'наличие благоустроенной парковки',
  //   'продуманная система безопасности, включая консьержа',
  //   'близость к транспортной развязке'
  // ];

  // var photos = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  // ];

  // var avatarMin = 1;
  // var avatarMax = 8;

  // var priceMin = 1000;
  // var priceMax = 1000000;

  // var roomsMin = 1;
  // var roomsMax = 10;

  // var guestsMin = 1;
  // var guestsMax = 10;

  // var minX = 40;
  // var maxX = 1160;

  // var pinsAmount = 8;

  // var getRandomNumber = function (min, max) {
  //   return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  // };

  // function getRandomElement(arr) {
  //   var rand = Math.floor(Math.random() * arr.length);
  //   return arr[rand];
  // }

  // var getRandomPin = function () {
  //   var pin = {
  //     'author': {
  //       'avatar': 'img/avatars/user' + 0 + getRandomNumber(avatarMin, avatarMax) + '.png'
  //     },
  //     'offer': {
  //       'title': getRandomElement(title),
  //       'address': getRandomNumber(minX, maxX) + ', ' + getRandomNumber(window.const.minY, window.const.maxY),
  //       'price': getRandomNumber(priceMin, priceMax),
  //       'type': getRandomElement(type),
  //       'rooms': getRandomNumber(roomsMin, roomsMax),
  //       'guests': getRandomNumber(guestsMin, guestsMax),
  //       'checkin': getRandomElement(check),
  //       'checkout': getRandomElement(check),
  //       'features': getRandomElement(features),
  //       'description': getRandomElement(description),
  //       'photos': getRandomElement(photos)
  //     },

  //     'location': {
  //       'x': getRandomNumber(minX, maxX),
  //       'y': getRandomNumber(window.const.minY, window.const.maxY)
  //     }
  //   };

  //   return pin;
  // };

  // var randomPins = function () {
  //   var arrayPins = [];

  //   // for (var i = 0; i < pinsAmount; i++) {
  //   //   arrayPins.push(getRandomPin());
  //   // }
  //   return arrayPins;
  // };

  var pinListElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (element) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinPicture = pinElement.querySelector('img');
    pinPicture.src = element.author.avatar;
    pinPicture.alt = element.offer.title;
    pinElement.style.left = (element.location.x - window.const.widthPin / 2) + 'px';
    pinElement.style.top = (element.location.y - window.const.heightPin) + 'px';

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

  // var pins = randomPins();

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
    // pins: pins,
    // features: features,
    // photos: photos,
    renderPins: renderPins,
    removePins: removePins
  };
})();
