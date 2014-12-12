var _ = require("underscore");


var Intellect = function( options ){
	// fallbacks
	options = options || {};

}

Intellect.prototype = {

	constructor: Intellect,

}

module.exports = function( options ){
	new Intellect( options );
}