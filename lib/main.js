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
	// init
	// methods
	this.interpret = new Interpret( this.options );
	this.request = new Request( this.options );
	this.response = new Response( this.options );
	this.stack = new Stack( this.options );

	return this;
}

Intellect.prototype = {

	constructor: Intellect,

	process: function( input, callback ){
		// process input
		var req = this.request(input);
		var res = this.response( req );
		// process middleware
		this.stack.process(function( req, res ){
			// continue
			callback( req, res );
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
