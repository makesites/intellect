// a "Hello World"" example

var Intellect = require("../index"), // use instead: require("intellect")
	connect = require('connect'),
	querystring = require('querystring'),
	http = require('http');

var options = {
		// this method controls what data is returned
		interpreter: function( req, res, next ){
			// in this simple example the data is obvious
			res.data = res.results;
			next();
		}
	};

// init Intellect
var intellect = Intellect( options );

var result = null; // variable will store the result

// APP
var app = connect()
	.use(function(req, res, next){
		// perform logic actions
		var params = querystring.parse( req._parsedUrl.query );
		// continue only if we have data to process
		if(! params.say ) return next();
		intellect.process( params.say, function( req, res ){
			result = res.data || null;
			next();
		});

	})
	.use(function(req, res, next){
		// output markup
		var html = '<html><body style="text-align: center; font-size: 200%">';
		if( result !== null ) html += "<h1>"+ result +"</h1>";
		html += '<form action="/">';
		html += '<input type="text" name="say" placeholder="say hi..." style="font-size: 200%">';
		html += "</form></body></html>";
		res.end( html );
	});


// middleware
function readHi( req, res, next ){
	// evaluate the request first
	var text = req.body.toLowerCase();
	var valid = ( text == "hi" || text == "hello" ) ? true : false;
	res.results = (valid) ? "Hello World!" : "Say what?";
	next();
}
intellect.use( readHi );

// server
http.createServer(app).listen(80);
