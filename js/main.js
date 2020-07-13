'use strict';

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
    if (document.getElementById('card__on')) {
      createCard.remove();
    } else {
      createCard(element);
      // pinElement.removeEventListener('click', openCart);
      // pinElement.removeEventListener('keydown', openCart);
    }
  });
  pinElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (document.getElementById('card__on')) {
        createCard.remove();
      } else {
        createCard(element);
        // pinElement.removeEventListener('click', openCart);
        // pinElement.removeEventListener('keydown', openCart);
      }
    }
  });
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


var cartTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFilter = document.querySelector('.map__filters-container');

var createCard = function (element) {
  var cartElement = cartTemplate.cloneNode(true);
  var pinAvatar = cartElement.querySelector('.popup__avatar');
  var pinsPicture = cartElement.querySelector('.popup__photos');
  var pinPicture = cartElement.querySelector('.popup__photo');
  var featuresCart = cartElement.querySelector('.popup__features');
  var numberRoom = element.offer.rooms;
  var numberQuests = element.offer.guests;

  // Склонение комнат и гостей

  var getNounRoom = function (number) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
      return ' комнат для ';
    }
    number %= 10;
    if (number === 1) {
      return ' комнатa для ';
    }
    if (number >= 2 && number <= 4) {
      return ' комнаты для ';
    }
    return ' комнаты для ';
  };

  var getNounQuests = function (number) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
      return ' гостей ';
    }
    number %= 10;
    if (number === 1) {
      return ' гостя ';
    }
    return ' гостей ';
  };

  // Создание списка преимуществ

  var createFeatures = function () {
    for (var a = 0; a < features.length; a++) {
      var renderFeatures = document.createElement('li');
      renderFeatures.classList.add('popup__feature', 'popup__feature--' + features[a]);
      featuresCart.append(renderFeatures);
    }
  };

  // Создание списка фотографий

  pinPicture.src = element.offer.photos;
  for (var i = 0; i < photos.length; i++) {
    var renderPhotos = pinPicture.cloneNode(true);
    pinPicture.src = photos[i];
    pinsPicture.appendChild(renderPhotos);
  }

  pinAvatar.src = element.author.avatar;
  cartElement.querySelector('.popup__title').textContent = element.offer.title;
  cartElement.querySelector('.popup__text--address').textContent = element.offer.address;
  cartElement.querySelector('.popup__text--price').textContent = element.offer.price + ' ₽/ночь';
  cartElement.querySelector('.popup__type').textContent = element.offer.type;
  cartElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + getNounRoom(numberRoom) + element.offer.guests + getNounQuests(numberQuests);
  cartElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ',' + ' выезд до ' + element.offer.checkout;
  cartElement.querySelector('.popup__description').textContent = element.offer.description;
  featuresCart.innerHTML = '';
  createFeatures();
  map.insertBefore(cartElement, mapFilter);

  // Закрытие карточки

  var popupCard = document.querySelector('.map__card');
  var closeCart = document.querySelector('.popup__close');

  var closesCart = function (evt) {
    evt.preventDefault();
    if (evt.which === 1) {
      popupCard.remove();
      popupCard.removeEventListener('click', closesCart);
      popupCard.removeEventListener('keydown', closesCart);
    }
    if (evt.key === 'Escape') {
      popupCard.remove();
      mapPinMain.removeEventListener('keydown', openForm);
      mapPinMain.removeEventListener('click', openForm);
    }
  };

  closeCart.addEventListener('click', closesCart);
  map.addEventListener('keydown', closesCart);
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


  renderPins(pins);
  addressMap();
  validate();
};

var openForm = function (evt) {
  evt.preventDefault();
  if (evt.which === 1) {
    activateForm();
    mapPinMain.removeEventListener('mousedown', openForm);

    mapPinMain.removeEventListener('keydown', openForm);

  }
  if (evt.key === 'Enter') {
    activateForm();
    mapPinMain.removeEventListener('keydown', openForm);

    mapPinMain.removeEventListener('mousedown', openForm);

  }
};

mapPinMain.addEventListener('mousedown', openForm);

mapPinMain.addEventListener('keydown', openForm);

var inputAddress = document.querySelector('#address');

var addressMap = function () {
  if (map.classList.contains('map--faded')) {
    inputAddress.value = Math.round(mapPinMain.offsetLeft + widthPin / 2) + ', ' + Math.round(mapPinMain.offsetTop + heightPin / 2);
  } else {
    inputAddress.value = Math.round(mapPinMain.offsetLeft + widthPin / 2) + ', ' + Math.round(mapPinMain.offsetTop + heightPin + 22);
  }
};
addressMap();

var roomsNumbers = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

var validate = function () {
  if (roomsNumbers.value === '100') {
    if (capacity.value !== '0') {
      roomsNumbers.setCustomValidity('Выберите другое значение');
    } else {
      roomsNumbers.setCustomValidity('');
    }
  } else {
    if (capacity.value === '0') {
      roomsNumbers.setCustomValidity('Выберите другое значение');
    } else if (roomsNumbers.value >= capacity.value) {
      roomsNumbers.setCustomValidity('');
    } else {
      roomsNumbers.setCustomValidity('Количество гостей не должно привышать количеством комнат');
    }
  }
};

roomsNumbers.addEventListener('change', function () {
  validate();
});

capacity.addEventListener('change', function () {
  validate();
});


var typeHous = adForm.querySelector('#type');
var priceHous = adForm.querySelector('#price');
var priceMinHous = {
  minBungalo: 0,
  minFlat: 1000,
  minHouse: 5000,
  minPalace: 10000
};

var typeHousValidate = function () {
  if (typeHous.value === 'bungalo') {
    priceHous.placeholder = '0';
    if (priceHous.value >= priceMinHous.minBungalo) {
      typeHous.setCustomValidity('');
    } else {
      typeHous.setCustomValidity('Цена за ночь не соответствует минимальной');
    }
  }
  if (typeHous.value === 'flat') {
    priceHous.placeholder = '1000';
    if (priceHous.value >= priceMinHous.minFlat) {
      typeHous.setCustomValidity('');
    } else {
      typeHous.setCustomValidity('Цена за ночь не соответствует минимальной');
    }
  }
  if (typeHous.value === 'house') {
    priceHous.placeholder = '5000';
    if (priceHous.value >= priceMinHous.minHouse) {
      typeHous.setCustomValidity('');
    } else {
      typeHous.setCustomValidity('Цена за ночь не соответствует минимальной');
    }
  }
  if (typeHous.value === 'palace') {
    priceHous.placeholder = '10000';
    if (priceHous.value >= priceMinHous.minPalace) {
      typeHous.setCustomValidity('');
    } else {
      typeHous.setCustomValidity('Цена за ночь не соответствует минимальной');
    }
  }
  // if ((typeHous.value === 'bungalo' priceHous.placeholder = '0') && priceHous.value >= priceMinHous.minBungalo) {
  //   typeHous.setCustomValidity('');
  // } else if ((typeHous.value === 'flat', priceHous.placeholder = '1000') && priceMinHous.minFlat) {
  //   priceHous.placeholder = '1000';
  //   typeHous.setCustomValidity('');
  // } else if (typeHous.value === 'house' && priceHous.value >= priceMinHous.minHouse) {
  //   priceHous.placeholder = '5000';
  //   typeHous.setCustomValidity('');
  // } else if (typeHous.value === 'palace' && priceHous.value >= priceMinHous.minPalace) {
  //   priceHous.placeholder = '5000';
  //   typeHous.setCustomValidity('');
  // } else {
  //   typeHous.setCustomValidity('Цена за ночь не соответствует минимальной');
  // }
};

typeHous.addEventListener('change', function () {
  typeHousValidate();
});

typeHous.removeEventListener('keydown', openForm);

priceHous.addEventListener('change', function () {
  typeHousValidate();
});

var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');

var timeValidate = function () {
  if (timein.value === '12:00') {
    timeout.value = '12:00';
  } else if (timein.value === '13:00') {
    timeout.value = '13:00';
  } else {
    timeout.value = '14:00';
  }
  // } else {
  //   timein.setCustomValidity('Время заезда должно совпадать со временем выезда');
  // }
};

timein.addEventListener('change', function () {
  timeValidate();
});

timeout.addEventListener('change', function () {
  timeValidate();
});
