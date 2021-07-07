'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var fieldsOff = adForm.querySelectorAll('fieldset');
  var formReset = adForm.querySelector('.ad-form__reset');

  mapFilters.classList.add('ad-form--disabled');

  var fieldsetOff = function () {
    fieldsOff.forEach(function (element) {
      element.disabled = true;
    });
  };
  fieldsetOff();

  var fieldsetOn = function () {
    fieldsOff.forEach(function (element) {
      element.disabled = false;
    });
  };

  var activateForm = function () {
    mapFilters.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    fieldsetOn();
    window.backend.load(function (data) {
      window.form.offersArray = data;
      window.pin.renderPins(data.slice(0, window.const.MAX_PIN_MAP));
    });
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
      inputAddress.value = Math.round(window.move.mapPinMain.offsetLeft + window.const.WIDTH_PIN / 2) + ', ' + Math.round(window.move.mapPinMain.offsetTop + window.const.HEIGHT_PIN / 2);
    } else {
      inputAddress.value = Math.round(window.move.mapPinMain.offsetLeft + window.const.WIDTH_PIN / 2) + ', ' + Math.round(window.move.mapPinMain.offsetTop + window.const.HEIGHT_PIN + 22);
    }
  };
  addressMap();

  var roomsNumbers = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var validate = function () {
    if (roomsNumbers.value === window.const.ROOMS_MAX) {
      if (capacity.value !== window.const.ROOMS_MIN) {
        roomsNumbers.setCustomValidity('Выберите другое значение');
      } else {
        roomsNumbers.setCustomValidity('');
      }
    } else {
      if (capacity.value === window.const.ROOMS_MIN) {
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
    if (typeHous.value === window.const.BUNGALO) {
      priceHous.placeholder = window.const.PLACEHOLDER_BUNGALO;
      if (priceHous.value >= priceMinHous.minBungalo) {
        typeHous.setCustomValidity('');
      } else {
        typeHous.setCustomValidity('Цена за ночь не соответствует минимальной');
      }
    }
    if (typeHous.value === window.const.FLAT) {
      priceHous.placeholder = window.const.PLACEHOLDER_FLAT;
      if (priceHous.value >= priceMinHous.minFlat) {
        typeHous.setCustomValidity('');
      } else {
        typeHous.setCustomValidity('Цена за ночь не соответствует минимальной');
      }
    }
    if (typeHous.value === window.const.HOUSE) {
      priceHous.placeholder = window.const.PLACEHOLDER_HOUSE;
      if (priceHous.value >= priceMinHous.minHouse) {
        typeHous.setCustomValidity('');
      } else {
        typeHous.setCustomValidity('Цена за ночь не соответствует минимальной');
      }
    }
    if (typeHous.value === window.const.PALACE) {
      priceHous.placeholder = window.const.PLACEHOLDER_PALACE;
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
    if (timein.value === window.const.TWELVE_CLOCK) {
      timeout.value = window.const.TWELVE_CLOCK;
    } else if (timein.value === window.const.ONE_CLOCK) {
      timeout.value = window.const.ONE_CLOCK;
    } else {
      timeout.value = window.const.TWO_CLOCK;
    }
  };

  timeInput.addEventListener('change', function () {
    timeValidate(timeInput, timeoutInput);
  });

  timeoutInput.addEventListener('change', function () {
    timeValidate(timeoutInput, timeInput);
  });

  // Отправка формы
  var deactivateForm = function () {
    window.move.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.preview.removeImage();
    window.preview.removeAvatar();
    window.pin.removePins();
    window.pin.stayMainPin();
    window.filter.housingFilters.reset();
    fieldsetOff();
    window.move.mapPinMain.addEventListener('mouseup', openForm);
    window.move.mapPinMain.addEventListener('keydown', openForm);
  };

  var onSubmit = function (evt) {
    window.backend.upload(new FormData(adForm));
    deactivateForm();
    evt.preventDefault();
  };

  adForm.addEventListener('submit', onSubmit);

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivateForm();
  });

  window.form = {
    activateForm: activateForm,
    openForm: openForm,
    addressMap: addressMap,
  };
})();
