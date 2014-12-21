/**
 * Intellect: Request
 *
 * Processing the request object
**/
var _ = require("underscore"),
	defaults = require("../config/request"),
	async = require("async");


var Class = function( options ){
	// fallbacks
	options = options || {};
	// merge options with defaults?
	this.options = _.extend({}, options);
	var self = this;
	// prerequisites
	// ...
	return function( input ){
		// new copy for every request
		var req = new Request( input );
		req.options = self.options;
		return req;
	};
}

var Request = function( input ){
	// if object is should contain req config
	var req = ( typeof input == "object" ) ? input : {
		body: input
	};
	this.data = _.extend({}, req, defaults);
}

Request.prototype = {

	constructor: Request,

	// get request data
	get: function( key ){
		// return all the data if no key
		return ( key ) ? this._data[key]: this._data;
	},

	// set request data
	set: function( data ){
		for( var key in data ){

		}
		// return object to chain?
	},

	// Internal
	_data: {}
}



module.exports = Class;