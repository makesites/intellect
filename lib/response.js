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
	var self = this;
	// prerequisites
	// ...
	return function( req ){
		// new copy for every request
		var res = new Response( req );
		res.options = self.options;
		return res;
	};
}


var Response = function( req ){
	// save a reference of the request?
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
			this._data[key] = data[key];
		}
		// return object to chain?
	},

	// Internal
	_data: {}
}



module.exports = Class;
