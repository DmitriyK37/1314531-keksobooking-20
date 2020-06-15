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

var formDisable = function () {
  for (var i = 0; i < fieldsOff.length; i++) {
    fieldsOff[i].disabled = true;
  }
};
formDisable();

var mapPinMain = document.querySelector('.map__pin--main');

var activeForm = function () {
  map.classList.remove('map--faded');
  mapFilters.classList.remove('ad-form--disabled');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldsOff.length; i++) {
    fieldsOff[i].disabled = false;
  }
  renderPins();
};

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.which === 1) {
    activeForm();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    activeForm();
  }
});

var inputAddress = document.querySelector('#address');

var addressMap = function () {
  if (map.classList.contains('map--faded')) {
    inputAddress.value = '603 px 408 px';
  } else {
    inputAddress.value = '605 px 408 px';
  }
};
addressMap();
// Тут условие не работает, посмотри пожалуйста


var roomsNumbers = adForm.querySelector('#room_number').children;
var capacity = adForm.querySelector('#capacity').children;

// for (var i=0; i < roomsNumbers.length; i++) {

// };

// for (var j=0; j < capacity.length; j++);


// Почему-то не работает, не могу разабраться!

var validi = function () {
  if (roomsNumbers[0].selected) {
    capacity[2].selected = true;
  } if (roomsNumbers[1].selected) {
    capacity[1].selected = true;
  } if (roomsNumbers[2].selected) {
    capacity[0].selected = true;
  } if (roomsNumbers[3].selected) {
    capacity[3].selected = true;
  }
};

validi();

