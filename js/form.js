'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsOff = adForm.querySelectorAll('fieldset');


  mapFilters.classList.add('ad-form--disabled');

  fieldsOff.forEach(function (el) {
    el.disabled = true;
  });

  var activateForm = function () {
    mapFilters.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    fieldsOff.forEach(function (el) {
      el.disabled = false;
    });

    window.pin.renderPins(window.pin.pins);
    validate();
  };

  var openForm = function (evt) {
    evt.preventDefault();
    if (evt.which === 1) {
      activateForm();
      window.move.mapPinMain.removeEventListener('mouseup', openForm);
      window.move.mapPinMain.removeEventListener('keydown', openForm);
    }
    if (evt.key === 'Enter') {
      activateForm();
      window.move.mapPinMain.removeEventListener('keydown', openForm);
      window.move.mapPinMain.removeEventListener('mouseup', openForm);
    }
  };

  window.move.mapPinMain.addEventListener('mouseup', openForm);

  window.move.mapPinMain.addEventListener('keydown', openForm);

  var inputAddress = document.querySelector('#address');

  var addressMap = function () {
    if (window.move.map.classList.contains('map--faded')) {
      inputAddress.value = Math.round(window.move.mapPinMain.offsetLeft + window.pin.widthPin / 2) + ', ' + Math.round(window.move.mapPinMain.offsetTop + window.pin.heightPin / 2);
    } else {
      inputAddress.value = Math.round(window.move.mapPinMain.offsetLeft + window.pin.widthPin / 2) + ', ' + Math.round(window.move.mapPinMain.offsetTop + window.pin.heightPin + 22);
    }
  };


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
  };
  typeHousValidate();
  typeHous.addEventListener('change', function () {
    typeHousValidate();
  });

  typeHous.removeEventListener('keydown', openForm);

  priceHous.addEventListener('change', function () {
    typeHousValidate();
  });

  var timeInput = adForm.querySelector('#timein');
  var timeoutInput = adForm.querySelector('#timeout');

  var timeValidate = function (timein, timeout) {
    if (timein.value === '12:00') {
      timeout.value = '12:00';
    } else if (timein.value === '13:00') {
      timeout.value = '13:00';
    } else {
      timeout.value = '14:00';
    }
  };

  timeInput.addEventListener('change', function () {
    timeValidate(timeInput, timeoutInput);
  });

  timeoutInput.addEventListener('change', function () {
    timeValidate(timeoutInput, timeInput);
  });

  window.form = {
    openForm: openForm,
    addressMap: addressMap
  };
})();
