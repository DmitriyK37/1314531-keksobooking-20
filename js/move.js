'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var limit = {
    limitTop: window.const.MIN_Y - window.const.HEIGHT_PIN - 22,
    limitBottom: window.const.MAX_Y - window.const.HEIGHT_PIN - 23,
    limitRight: Math.round(map.offsetWidth - window.const.WIDTH_PIN / 2 - 2),
    limitLeft: Math.round(0 - window.const.WIDTH_PIN / 2 + 1)
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    map.classList.remove('map--faded');
    window.form.addressMap();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      window.form.addressMap();

      if ((mapPinMain.offsetTop - shift.y) > limit.limitBottom) {
        mapPinMain.style.top = limit.limitBottom + 'px';
      } else if ((mapPinMain.offsetTop - shift.y) < limit.limitTop) {
        mapPinMain.style.top = limit.limitTop + 'px';
      }
      if ((mapPinMain.offsetLeft - shift.x) > limit.limitRight) {
        mapPinMain.style.left = limit.limitRight + 'px';
      } else if ((mapPinMain.offsetLeft - shift.x) < limit.limitLeft) {
        mapPinMain.style.left = limit.limitLeft + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER) {
      evt.preventDefault();
      map.classList.remove('map--faded');
      window.form.addressMap();
    }
  });

  window.move = {
    map: map,
    mapPinMain: mapPinMain
  };
})();
