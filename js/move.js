'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    map.classList.remove('map--faded');

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
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
      window.form.addressMap();
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

  window.move = {
    map: map,
    mapPinMain: mapPinMain
  };
})();
