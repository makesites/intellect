var _ = require("underscore");
	//crypto = require("crypto");
	//fs = require("fs"),
	//path = require("path");


// Helpers
var utils = {

	// merge objects into a new clone
	extend: function() {
		var objects = Array.prototype.slice.call(arguments);
		var object = {};
		for( var i in objects ){
			object = _.extend( object, objects[i] );
		}
		// make a (shallow) clone
		 object = JSON.parse(JSON.stringify( object ));

		return object;
	},

}

// private methods



module.exports = utils;
