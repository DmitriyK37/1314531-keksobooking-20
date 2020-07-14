'use strict';

(function () {
  var widthPin = 65;
  var heightPin = 65;

  var type = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var check = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var title = [
    'Дворец',
    'Квартира',
    'Дом',
    'Бунгало'
  ];

  var description = [
    'удобное расположение',
    'улучшенная инфраструктура',
    'просторная планировка квартир',
    'наличие благоустроенной парковки',
    'продуманная система безопасности, включая консьержа',
    'близость к транспортной развязке'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var avatarMin = 1;
  var avatarMax = 8;

  var priceMin = 1000;
  var priceMax = 1000000;

  var roomsMin = 1;
  var roomsMax = 10;

  var guestsMin = 1;
  var guestsMax = 10;

  var minX = 40;
  var maxX = 1160;

  var minY = 130;
  var maxY = 630;

  var pinsAmount = 8;

  var getRandomNumber = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  function getRandomElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }

  var map = document.querySelector('.map');

  var getRandomPin = function () {
    var pin = {
      'author': {
        'avatar': 'img/avatars/user' + 0 + getRandomNumber(avatarMin, avatarMax) + '.png'
      },
      'offer': {
        'title': getRandomElement(title),
        'address': getRandomNumber(minX, maxX) + ', ' + getRandomNumber(minY, maxY),
        'price': getRandomNumber(priceMin, priceMax),
        'type': getRandomElement(type),
        'rooms': getRandomNumber(roomsMin, roomsMax),
        'guests': getRandomNumber(guestsMin, guestsMax),
        'checkin': getRandomElement(check),
        'checkout': getRandomElement(check),
        'features': getRandomElement(features),
        'description': getRandomElement(description),
        'photos': getRandomElement(photos)
      },

      'location': {
        'x': getRandomNumber(minX, maxX),
        'y': getRandomNumber(minY, maxY)
      }
    };

    return pin;
  };

  var randomPins = function () {
    var arrayPins = [];

    for (var i = 0; i < pinsAmount; i++) {
      arrayPins.push(getRandomPin());
    }
    return arrayPins;
  };

  var pinListElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (element) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinPicture = pinElement.querySelector('img');
    pinPicture.src = element.author.avatar;
    pinPicture.alt = element.offer.title;
    pinElement.style.left = (element.location.x - widthPin / 2) + 'px';
    pinElement.style.top = (element.location.y - heightPin) + 'px';

    // Создание карточек
    // var openCart = function () {
    pinElement.addEventListener('click', function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      window.cart.createCard(element);
      // pinElement.removeEventListener('click', openCart);
      // pinElement.removeEventListener('keydown', openCart
    });
    // pinElement.addEventListener('keydown', function (evt) {
    //   if (evt.key === 'Enter') {
    //     if (document.getElementById('card__on')) {
    //       window.cart.createCard.remove();
    //     } else {
    //       window.cart.createCard(element);
    //       // pinElement.removeEventListener('click', openCart);
    //       // pinElement.removeEventListener('keydown', openCart);
    //     }
    //   }
    // });
    // };
    // pinElement.addEventListener('click', openCart);
    // pinElement.addEventListener('keydown', openCart);

    return pinElement;
  };

  var pins = randomPins();

  var renderPins = function (pinList) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pinList.length; i++) {
      fragment.appendChild(createPin(pinList[i]));
    }
    pinListElement.appendChild(fragment);
  };

  window.pin = {
    map: map,
    pins: pins,
    widthPin: widthPin,
    heightPin: heightPin,
    features: features,
    photos: photos,
    renderPins: renderPins
  };
})();
