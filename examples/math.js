// a simple example using the math extension to perform simple calculations

var Intellect = require("../index"), // use instead: require("intellect")
	connect = require('connect'),
	querystring = require('querystring'),
	http = require('http')
	math = require("intellect-math");

var options = {
		// nothing to add for now...
	};

// init Intellect
var intellect = Intellect( options );

// middleware
intellect.use( math() );

var result = null; // variable will store the result

// APP
var app = connect()
	.use(function(req, res, next){
		// perform logic actions
		var params = querystring.parse( req._parsedUrl.query );
		calculate( params.equation, next)
	})
	.use(function(req, res, next){
		// output markup
		var html = "<html><body>";
		if( result !== null ) html += "<h1>Result: "+ result +"</h1>";
		html += '<form action="/">';
		html += '<input type="text" name="equation" placeholder="what do you want to calculate?"></p>';
		html += "</form></body></html>";
		res.end( html );
	});


// Helper
function calculate( equation, callback ){

	intellect.process( equation, function( req, res ){
		console.log( res );
			result = res.data || null;
			callback();
	});
	callback();

}


http.createServer(app).listen(80);
