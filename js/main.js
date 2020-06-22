'use strict';

var widthPin = 50;
var heightPin = 70;

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
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
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
      'address': 'location.x',
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

var createPins = function (element) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinPicture = pinElement.querySelector('img');

  pinPicture.src = element.author.avatar;
  pinPicture.alt = element.offer.title;
  pinElement.style.left = (element.location.x - widthPin / 2) + 'px';
  pinElement.style.top = (element.location.y - heightPin) + 'px';

  return pinElement;
};

var renderPins = function () {
  var pins = randomPins();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPins(pins[i]));
  }

  pinListElement.appendChild(fragment);
};


// Валидация

var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var fieldsOff = adForm.querySelectorAll('fieldset');


mapFilters.classList.add('ad-form--disabled');

fieldsOff.forEach(function (el) {
  el.disabled = true;
});

var mapPinMain = document.querySelector('.map__pin--main');

var activateForm = function () {
  map.classList.remove('map--faded');
  mapFilters.classList.remove('ad-form--disabled');
  adForm.classList.remove('ad-form--disabled');
  fieldsOff.forEach(function (el) {
    el.disabled = false;
  });
  renderPins();
  addressMap();
  validate();
};

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.which === 1) {
    activateForm();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    activateForm();
  }
});

var inputAddress = document.querySelector('#address');

var addressMap = function () {
  if (map.classList.contains('map--faded')) {
    inputAddress.value = (mapPinMain.offsetLeft + widthPin / 2 + 'px ') + (mapPinMain.offsetTop + heightPin / 2 + 'px');
  } else {
    inputAddress.value = (mapPinMain.offsetLeft + widthPin / 2 + 'px ') + (mapPinMain.offsetTop + heightPin + 22 + 'px');
  }
};
addressMap();

var roomsNumbers = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

var validate = function () {
  if (roomsNumbers.value === capacity.value) {
    roomsNumbers.setCustomValidity('');
  } if (roomsNumbers.value !== capacity.value) {
    roomsNumbers.setCustomValidity('Количество комнат должно совпадать с количеством гостей');
  } if ((roomsNumbers.value === '100 комнат') === (capacity.value === 'не для гостей')) {
    roomsNumbers.setCustomValidity('Выберите другое значение');
  }
};

roomsNumbers.addEventListener('change', function () {
  validate();
});

capacity.addEventListener('change', function () {
  validate();
});
