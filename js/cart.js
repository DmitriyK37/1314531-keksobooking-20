'use strict';

(function () {
  var cartTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFilter = document.querySelector('.map__filters-container');

  var createCard = function (element) {
    var cartElement = cartTemplate.cloneNode(true);
    var pinAvatar = cartElement.querySelector('.popup__avatar');
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

    var createFeatures = function (features) {
      for (var a = 0; a < features.length; a++) {
        var renderFeatures = document.createElement('li');
        renderFeatures.classList.add('popup__feature', 'popup__feature--' + features[a]);
        featuresCart.append(renderFeatures);
      }
    };

    // Создание списка фотографий
    var pinsPicture = cartElement.querySelector('.popup__photos');
    var PHOTO_WIDTH = 45;
    var PHOTO_HEIGT = 50;
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

    if (element.offer.type === 'palace') {
      element.offer.type = 'Дворец';
    } else if (element.offer.type === 'flat') {
      element.offer.type = 'Квартира';
    } else if (element.offer.type === 'house') {
      element.offer.type = 'Дом';
    } else if (element.offer.type === 'bungalo') {
      element.offer.type = 'Бунгало';
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
    createFeatures(element.offer.features);
    pinsPicture.innerHTML = '';
    createPhoto(element.offer.photos);
    window.move.map.insertBefore(cartElement, mapFilter);

    // Закрытие карточки

    var closeCart = document.querySelector('.popup__close');

    var closesCart = function (evt) {
      evt.preventDefault();
      if (evt.which === 1) {
        cartElement.remove();
      }
      if (evt.key === 'Escape') {
        cartElement.remove();
      }
    };

    closeCart.addEventListener('click', closesCart);
    window.move.map.addEventListener('keydown', closesCart);
  };

  window.cart = {
    createCard: createCard,
  };
})();
