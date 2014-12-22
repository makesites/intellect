/**
 * Intellect: Interpret
 *
 * Handling the interpretation of tags into a data response
**/
var _ = require("underscore"),
	defaults = require("../config/response"),
	async = require("async");


var Interpret = function( options ){
	// fallbacks
	options = options || {};
	// merge options with defaults
	this.options = _.extend({}, options);
	// prerequisites
	// ...
	var self = this;
	//
	return function(req, res, next){

		if( self.options.interpreter ){
			return self.passive(req, res, next);
		}
		if( self.options.data ){
			return self.active(req, res, next);
		}
		// ultimate fallback? (no interpreter used)
		next( null, false );
	}

}

Interpret.prototype = {

	constructor: Interpret,

	// this interpretation requires data
	active: function(req, res, next){
		var data = this.options.data; // replace with db store lookup?
		var filtered = [];
		// type of response needs to match
		for( var i in data ){
			if( data[i].type == res.type ) filtered.push(data);
		}
		// tags selected by priority
		//...
		result = filtered; // pick one...
		next( null, result);
	},

	// this uses a third-party interpreter
	passive: function(req, res, next){
		return this.options.interpreter(req, res, next);
	}

}

module.exports = Interpret;