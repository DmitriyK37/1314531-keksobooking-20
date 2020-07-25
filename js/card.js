'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFilter = document.querySelector('.map__filters-container');
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGT = 50;
  var HOUSE_TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var create = function (element) {
    var cardElement = cardTemplate.cloneNode(true);
    var pinAvatar = cardElement.querySelector('.popup__avatar');
    var featurescard = cardElement.querySelector('.popup__features');
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

    var createFeatures = function (features) {
      for (var a = 0; a < features.length; a++) {
        var renderFeatures = document.createElement('li');
        renderFeatures.classList.add('popup__feature', 'popup__feature--' + features[a]);
        featurescard.append(renderFeatures);
      }
    };

    // Создание списка фотографий
    var pinsPicture = cardElement.querySelector('.popup__photos');
    var createPhoto = function (photos) {
      for (var i = 0; i < photos.length; i++) {
        var renderPictures = document.createElement('img');
        renderPictures.classList.add('popup__photo');
        pinsPicture.append(renderPictures);
        renderPictures.src = photos[i];
        renderPictures.alt = 'Фотография жилья';
        renderPictures.width = PHOTO_WIDTH;
        renderPictures.height = PHOTO_HEIGT;
      }
    };

    pinAvatar.src = element.author.avatar;
    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = element.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HOUSE_TYPE[element.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + getNounRoom(numberRoom) + element.offer.guests + getNounQuests(numberQuests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ',' + ' выезд до ' + element.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = element.offer.description;
    featurescard.innerHTML = '';
    createFeatures(element.offer.features);
    pinsPicture.innerHTML = '';
    createPhoto(element.offer.photos);
    window.move.map.insertBefore(cardElement, mapFilter);

    // Закрытие карточки

    var closecard = document.querySelector('.popup__close');

    var closeCardConteiner = function () {
      cardElement.remove();
      window.pin.inactive();
      document.removeEventListener('keydown', cardKeydownHandler);
    };

    var cardClickHandler = function (evt) {
      if (evt.which === window.const.LEFT_MOUSE_BUTTON) {
        closeCardConteiner();
      }
    };

    var cardKeydownHandler = function (evt) {
      if (evt.key === window.const.ESCAPE) {
        closeCardConteiner();
      }
    };

    closecard.addEventListener('click', cardClickHandler);
    document.addEventListener('keydown', cardKeydownHandler);
  };

  window.card = {
    create: create,
  };
})();
