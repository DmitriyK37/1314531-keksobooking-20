'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var limit = {
    limitTop: window.const.minY - window.const.heightPin - 22,
    limitBottom: window.const.maxY - window.const.heightPin - 23,
    limitRight: map.offsetWidth - window.const.widthPin / 2,
    limitLeft: 0 - window.const.widthPin / 2
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

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      window.form.addressMap();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

  window.move = {
    map: map,
    mapPinMain: mapPinMain
  };
})();
