'use strict';

(function () {
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
      for (var a = 0; a < window.pin.features.length; a++) {
        var renderFeatures = document.createElement('li');
        renderFeatures.classList.add('popup__feature', 'popup__feature--' + window.pin.features[a]);
        featuresCart.append(renderFeatures);
      }
    };

    // Создание списка фотографий

    pinPicture.src = element.offer.photos;
    for (var i = 0; i < window.pin.photos.length; i++) {
      var renderPhotos = pinPicture.cloneNode(true);
      pinPicture.src = window.pin.photos[i];
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
    window.pin.map.insertBefore(cartElement, mapFilter);

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
        window.cart.mapPinMain.removeEventListener('click', window.form.openForm);
        window.cart.mapPinMain.removeEventListener('keydown', window.form.openForm);
      }
    };

    closeCart.addEventListener('click', closesCart);
    window.pin.map.addEventListener('keydown', closesCart);
  };

  window.cart = {
    createCard: createCard
  };
})();
