/**
 * Intellect: Middleware Stack
 *
 * Manages the middleware and executes the logic
**/
var _ = require("underscore"),
	async = require("async");


var Stack = function( options ){
	// fallbacks
	options = options || {};
	// merge options with defaults?
	this.options = _.extend({}, options);
	// prerequisites
	// ...
	// init

}

Stack.prototype = {

	constructor: Stack,

	// adds a new middlaeware
	add: function( fn ){
		this._fn.push(fn);
	},

	// removes a middlware from the stack
	remove: function(fn){
		for( var i in this._fn ){
			if( fn == this._fn[i] ) delete this.fn[i];
		}
	},

	// executes middleware stack
	process: function( req, res, callback ){
		// loop through middleware
		async.eachSeries(this._fn, function( fn, next) {

			fn( req, res, next );
		}, function(err){
			// if any of the middleware processing produced an error, err would equal that error
			if( err ) {
				callback( err );
			} else {
				callback( null, true );
			}
		});

	},

	// Internal
	// collection of middleware
	_fn: []

}

module.exports = function( options ){
	return new Stack( options );
}
