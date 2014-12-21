/**
 * Intellect: Response
 *
 * Forming the response object
**/
var _ = require("underscore"),
	defaults = require("../config/response"),
	async = require("async");


var Class = function( options ){
	// fallbacks
	options = options || {};
	// merge options with defaults
	this.options = _.extend({}, options);
	// prerequisites
	// ...
	return function( req ){
		// new copy for every request
		var res = new Response( req );
		res.options = self.options;
		return req;
	};
}


var Response = function( input ){
	this._data = _.extend({}, defaults);
}

Response.prototype = {

	constructor: Response,

	// get response data
	get: function( key ){
		// return all the data if no key
		return ( key ) ? this._data[key]: this._data;
	},

	// set response data
	set: function( data ){
		for( var key in data ){

		}
		// return object to chain?
	},

	// Internal
	_data: {}
}



module.exports = Class;
