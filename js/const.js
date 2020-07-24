'use strict';
(function () {

  var MAX_PIN_MAP = 5;

  var MIN_Y = 130;
  var MAX_Y = 630;

  var WIDTH_PIN = 65;
  var HEIGHT_PIN = 65;

  var LOW_PRISE = 10000;
  var HIGH_PRISE = 50000;

  var ROOMS_MIN = '0';
  var ROOMS_MAX = '100';

  var ANY = 'any';
  var BUNGALO = 'bungalo';
  var FLAT = 'flat';
  var HOUSE = 'house';
  var PALACE = 'palace';

  var TWELVE_CLOCK = '12:00';
  var ONE_CLOCK = '13:00';
  var TWO_CLOCK = '14:00';

  var PLACEHOLDER_BUNGALO = '0';
  var PLACEHOLDER_FLAT = '1000';
  var PLACEHOLDER_HOUSE = '5000';
  var PLACEHOLDER_PALACE = '10000';

  var MIDDLE = 'middle';
  var LOW = 'low';
  var HIGH = 'high';

  window.const = {
    MAX_PIN_MAP: MAX_PIN_MAP,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    WIDTH_PIN: WIDTH_PIN,
    HEIGHT_PIN: HEIGHT_PIN,
    LOW_PRISE: LOW_PRISE,
    HIGH_PRISE: HIGH_PRISE,
    ROOMS_MIN: ROOMS_MIN,
    ROOMS_MAX: ROOMS_MAX,
    ANY: ANY,
    BUNGALO: BUNGALO,
    FLAT: FLAT,
    HOUSE: HOUSE,
    PALACE: PALACE,
    TWELVE_CLOCK: TWELVE_CLOCK,
    ONE_CLOCK: ONE_CLOCK,
    TWO_CLOCK: TWO_CLOCK,
    PLACEHOLDER_BUNGALO: PLACEHOLDER_BUNGALO,
    PLACEHOLDER_FLAT: PLACEHOLDER_FLAT,
    PLACEHOLDER_HOUSE: PLACEHOLDER_HOUSE,
    PLACEHOLDER_PALACE: PLACEHOLDER_PALACE,
    MIDDLE: MIDDLE,
    LOW: LOW,
    HIGH: HIGH
  };
})();
