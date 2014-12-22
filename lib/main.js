/**
 * Intellect
 *
 * Initiated by Makis Tracend ( @tracend )
 * Distributed through [Makesites]( http://makesites.org)
 * Released under the [MPL v2.0](http://www.mozilla.org/MPL/2.0/) & [AGPL](http://www.gnu.org/licenses/agpl.html)
**/
var _ = require("underscore"),
	async = require("async"),
	//fs = require("fs"),
	//path = require("path"),
	// helpers
	defaults = require('../config/options'),
	//error = require('./error'),
	//utils = require('./utils'),
	// lib classes
	Interpret = require('./interpret'),
	Request = require('./request'),
	Response = require('./response')
	Stack = require('./stack');


var Intellect = function( options ){
	// fallbacks
	options = options || {};
	// merge options with defaults
	this.options = _.extend({}, defaults, options);
	// prerequisites
	// ...
	// main methods
	this.interpret = new Interpret( this.options );
	this.request = new Request( this.options );
	this.response = new Response( this.options );
	this.stack = new Stack( this.options );

	return this;
}

Intellect.prototype = {

	constructor: Intellect,

	process: function( input, callback ){

		var req, res,
			self = this;

		// actions
		var actions = [
			// process request
			function(next){
				req = self.request(input); // synchronous?
				next(null);
			},
			// create response
			function(next){
				res = self.response( req ); // synchronous?
				next(null);
			},
			// process middleware
			function(next){
				self.stack.process(req, res, function( err, result){
					if( err ) return next( err );
					//if( !result ) return next( error("middleware_failed") );
					// continue
					next( null );
				});
			},
			// interpret response meta into a "meaningful" way for the user
			function(next){
				//this.interpret( req, res, next );
				self.interpret( req, res, function(err, result){
					if( err ) return next( err );
					// continue...
					next( null );
				});

			}

		];
		// execute
		async.series( actions, function(err, results){
			// execute next?
			if( err ){
				res.data = err; // better way: callback( err, req, res )?
			}
			callback(req, res);
		});
	},

	// common middleware interface
	use: function( fn ){
		// validation?
		this.stack.add( fn );
	}

}

module.exports = function( options ){
	// create a new instance evey time the module is included
	return new Intellect( options );
}
