"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var iconImg = L.icon({
  iconUrl: 'icon.png',
  iconSize: [60, 75],
  iconAnchor: [25, 16]
});
var mymap = L.map('issMap').setView([51.505, -0.09], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZXN0ZXJhMTIzIiwiYSI6ImNrcWNmNjN4ZzB2cmsydm92OXgzeHM1MHoifQ.BlWqQ0Yc4fqR4mF_p1rcgg'
}).addTo(mymap);

function getApiUrl(_x) {
  return _getApiUrl.apply(this, arguments);
}

function _getApiUrl() {
  _getApiUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ipAddress) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("https://geo.ipify.org/api/v1?apiKey=at_N7bI2kkvX3c6QIv1J3m6dgvIbJugA&ipAddress=".concat(ipAddress));

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getApiUrl.apply(this, arguments);
}

function latLongInput() {
  return _latLongInput.apply(this, arguments);
}

function _latLongInput() {
  _latLongInput = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var marker, input, data, latitude, longitude;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            marker = L.marker([0, 0], {
              icon: iconImg
            }).addTo(mymap);
            input = document.querySelector(".form-control").value;
            _context2.next = 4;
            return getApiUrl(input);

          case 4:
            data = _context2.sent;
            latitude = data.location.lat;
            longitude = data.location.lng;
            marker.setLatLng([latitude, longitude]);
            mymap.setView([latitude, longitude], 13);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _latLongInput.apply(this, arguments);
}

function displayData() {
  return _displayData.apply(this, arguments);
}

function _displayData() {
  _displayData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var data, source, template, temp, mainContent, target;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return latLongInput();

          case 2:
            data = _context3.sent;
            source = document.querySelector('#dataTemplate').innerHTML;
            template = Handlebars.compile(source);
            temp = document.querySelector('#temp');
            mainContent = document.querySelector('.main-content');

            if (temp) {
              temp.remove();
            } else if (mainContent) {
              mainContent.remove();
            }

            target = document.querySelector('#content');
            target.innerHTML += template(data);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _displayData.apply(this, arguments);
}

document.querySelector('.submit').addEventListener('click', function (e) {
  e.preventDefault();
  displayData();
});
//# sourceMappingURL=app.js.map
