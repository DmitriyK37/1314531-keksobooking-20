'use strict';
(function () {
  var housingFilters = document.querySelector('.map__filters');
  var housingType = housingFilters.querySelector('#housing-type');
  var housingRooms = housingFilters.querySelector('#housing-rooms');
  var housingGuests = housingFilters.querySelector('#housing-guests');
  var housingprice = housingFilters.querySelector('#housing-price');
  var mapFeatures = housingFilters.querySelector('#housing-features');

  // var types = {
  //   'palace': 'Дворец',
  //   'flat': 'Квартира',
  //   'house': 'Дом',
  //   'bungalo': 'Бунгало'
  // };
  // var filter = window.pin.renderPins.filter(window.pin.renderPins.element.offer.type.value === 'Дворец');
  // window.backend.load(filter);
  var filter = function () {
    var offers = window.form.offersArray;
    var resultArray = [];
    var checkHousingType = function (offer) {
      if (!(housingType.value === 'any')) {
        return housingType.value === offer.offer.type;
      }
      return offer;
    };
    var checkHousingRooms = function (offer) {
      if (!(housingRooms.value === 'any')) {
        return housingRooms.value === String(offer.offer.rooms);
      }
      return offer;
    };
    var checkHousingGuests = function (offer) {
      if (!(housingGuests.value === 'any')) {
        return housingGuests.value === String(offer.offer.guests);
      }
      return offer;
    };
    var checkHousingPrise = function (offer) {
      if (!(housingprice.value === 'any')) {
        if (housingprice.value === 'middle') {
          return offer.offer.price < window.const.HIGH_PRISE && offer.offer.price >= window.const.LOW_PRISE;
        } else if (housingprice.value === 'low') {
          return offer.offer.price < window.const.LOW_PRISE;
        } else if (housingprice.value === 'high') {
          return offer.offer.price >= window.const.HIGH_PRISE;
        }
      }
      return offer;
    };

    var checkFeatures = function (offer) {
      var checkedFeatures = Array.from(mapFeatures.querySelectorAll('input:checked'));
      for (var i = 0; i < checkedFeatures.length; i++) {
        if (!offer.offer.features.includes(checkedFeatures[i].value)) {
          return false;
        }
      }
      return offer;
    };

    for (var i = 0; i < offers.length && resultArray.length < 5; i++) {
      if (checkHousingType(offers[i]) && checkHousingPrise(offers[i]) && checkHousingRooms(offers[i]) && checkHousingGuests(offers[i]) && checkFeatures(offers[i])) {
        resultArray.push(offers[i]);
      }
    }
    return resultArray;
  };
  housingFilters.addEventListener('change', window.debounce(function () {
    window.pin.removePins();
    window.pin.renderPins(filter());
  }));
})();
