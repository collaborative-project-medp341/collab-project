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

var roundNum = function roundNum(num, pre) {
  pre = Math.pow(10, pre);
  return Math.ceil(num * pre) / pre;
};

var prevTmp = 0;

var handleRequest = function handleRequest(timePeriod, iso) {
  var path = "".concat(api_url, "/").concat(timePeriod.start, "/").concat(timePeriod.end, "/").concat(iso);
  $("#title-time-period").html("Time Period from ".concat(timePeriod.start, " to ").concat(timePeriod.end)); //request 

  $.get(path, function (data) {
    $("#time-period-info").html("# of records received: ".concat(data.length));
    var sum = 0;

    for (month in data) {
      var tempF = data[month].annualData[0] * 9 / 5 + 32;
      tempF = roundNum(tempF, 2);
      sum += tempF;
    }

    var tempAvg = roundNum(sum / data.length, 2);
    var circleWH = Math.floor(tempAvg);
    $('#time-period-circle').css({
      "width": "".concat(circleWH),
      "height": "".concat(circleWH)
    });
    prevTmp = tempAvg;
    $("#time-period-avg").html("".concat(tempAvg));
  });
};

var handleForm = function handleForm() {
  //clear any previous data 
  $("#time-period-info").empty();
  $("#time-period-avg").empty();
  $("#title-time-period").empty();
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