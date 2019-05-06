"use strict";

var api_url = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas';
var timeData = {
  past1: {
    start: 1920,
    end: 1939
  },
  past2: {
    start: 1940,
    end: 1959
  },
  past3: {
    start: 1960,
    end: 1979
  },
  past4: {
    start: 1980,
    end: 1999
  },
  future1: {
    start: 2020,
    end: 2039
  },
  future2: {
    start: 2040,
    end: 2059
  },
  future3: {
    start: 2060,
    end: 2079
  },
  future4: {
    start: 2080,
    end: 2099
  }
};
var ISO = {
  india: 'IND',
  australia: 'AUS',
  congo: 'COD',
  brazil: 'BRA'
};

var handleRequest = function handleRequest(timePeriod, iso) {
  var path = "".concat(api_url, "/").concat(timePeriod.start, "/").concat(timePeriod.end, "/").concat(iso);
  $.get(path, function (data) {
    for (month in data) {
      console.log(data[month].annualData[0]);
    }
  });
};

var handleForm = function handleForm() {
  var val = $("#apiForm")[0].children[0].value;
  var path = window.location.pathname;
  path = path.slice(1, -5);
  var timePeriod = timeData[val];
  var iso = ISO[path];
  handleRequest(timePeriod, iso);
};

$(function () {
  console.log('page is loaded');
});