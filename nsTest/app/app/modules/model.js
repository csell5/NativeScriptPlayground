var observable = require("ui/core/observable");
var http = require("http");

var model = new observable.Observable();
model.counter = 42;
model.setProperty("message", model.counter + " taps left");
model.tapAction = function(){

	model.setProperty("message", "calling endpoint...");

	var requestOptions = {
		url: "https://www.thatconference.com/api3/Session/GetAcceptedSessions",
		get: "GET"
	};

	http.getJSON(requestOptions).then(function (result) {
	
		model.setProperty("message", result[1].Title);

		var stuff = ["aa", "bb", "cc"];
		//model.setProperty("sessionItems", stuff);
	    
	}).fail(function (e) {
		// Argument (e) is Error!
		model.setProperty("message", "fail whale");
	    console.log(e);
	});
}

module.exports = model;
