// a simple example using the math extension to perform simple calculations

var Intellect = require("../index"), // use instead: require("intellect")
	connect = require('connect'),
	querystring = require('querystring'),
	http = require('http')
	math = require("intellect-math");

var options = {
		// this method controls what data is returned
		interpreter: function( req, res, next ){
			// in this simple example the data is obvious
			res.data = res.results.math;
			next();
		}
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
		// continue only if we have data to process
		if(! params.equation ) return next();
		calculate( params.equation, next)
	})
	.use(function(req, res, next){
		// output markup
		var html = '<html><body style="text-align: center; font-size: 200%">';
		if( result !== null ) html += "<h1>Result: "+ result +"</h1>";
		html += '<form action="/">';
		html += '<input type="text" name="equation" placeholder="what to calculate:" style="font-size: 200%">';
		html += "</form></body></html>";
		res.end( html );
	});


// Helper
function calculate( equation, callback ){
	intellect.process( equation, function( req, res ){
		result = res.data || null;
		callback();
	});
}


http.createServer(app).listen(80);
