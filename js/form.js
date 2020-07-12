'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsOff = adForm.querySelectorAll('fieldset');


  mapFilters.classList.add('ad-form--disabled');

  fieldsOff.forEach(function (el) {
    el.disabled = true;
  });

  var mapPinMain = document.querySelector('.map__pin--main');

  var activateForm = function () {
    window.pin.map.classList.remove('map--faded');
    mapFilters.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    fieldsOff.forEach(function (el) {
      el.disabled = false;
    });

    window.pin.renderPins(window.pin.pins);
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
    if (window.pin.map.classList.contains('map--faded')) {
      inputAddress.value = Math.round(mapPinMain.offsetLeft + window.pin.widthPin / 2) + ', ' + Math.round(mapPinMain.offsetTop + window.pin.heightPin / 2);
    } else {
      inputAddress.value = Math.round(mapPinMain.offsetLeft + window.pin.widthPin / 2) + ', ' + Math.round(mapPinMain.offsetTop + window.pin.heightPin + 22);
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

  window.cart = {
    mapPinMain: mapPinMain,
    openForm: openForm
  };
})();
