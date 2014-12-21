# Intellect

Allowing a computer to understand and interpret a request and respond accordingly.


## Install

Using npm:
```
npm install intellect
```


## Usage

The core library is a skeleton facilitating for the arbitrary inclusion of logic processes, using a middleware architecture.

```
var Intellect = require("intellect"),
	math = require("intellect-math");

// init Intellect
var intellect = Intellect( options );

// middleware
intellect.use(math);

// then later, in the context of a request
intellect(data, function(req, res){
	// req, res are created by intellect (not extending express objects)
	// response is saved in res.data
	console.log( res.data );
});

```


## Options


## Middleware


## Interpreter



## Showcase


## Credits

Initiated by [Makis Tracend](http://github.com/tracend)

Distributed through [Makesites.org](http://makesites.org)


## License

Released under the [MPL v2.0](http://www.mozilla.org/MPL/2.0/) & [AGPL](http://www.gnu.org/licenses/agpl.html)
