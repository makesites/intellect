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
intellect.use( math() );

// then later, in the context of a request
intellect.process(data, function(req, res){
	// req, res are created by intellect (not extending express objects)
	// response is saved in res.data
	console.log( res.data );
});

```


## Options

When initiating the lib you may use any of these configuration options:

* **formats** (Default: ["text"]), the input/output types expected to be used Currently only text is supported.
* **data** (Default: null), provided data, used when intellect is in "active" mode. (described below)
* **interpreter** (Default: false), an application method that can relate the response data (~tags) to a dialog string


## Middleware

The majority of the logic is externalized in separate modules. This is done for a number of reasons, a few of which are:

* So the modules can be replaced, allowing a variaty of AI "flavors"
* The logic can be dynamically enabled/disabled during runtime
* Each logical branch is developed independently

Each middleware can affect both the request and the response object; defining on the one hand the type of the request and extracting useful metadata, and updating, adding or even deleting the descriptive tags in the response.

Officially supported modules are available at: [https://github.com/intellect-modules](https://github.com/intellect-modules)



## Interpreter

After the request is processed and the middleware have completed "tweaking" the response's meta data, picking the right dialog line is the final step. To allow the selection in a non-restrictive manner, there are two distinct methods this can be achieved:

### Passive mode

When an interpreter method is included in the options, the library enters "passive" mode to allow a third-party method declare which data matches the described response. Primary role in this mode play the ```type``` of the response and the tags assigned to it.

### Active Mode

In this mode the lib will attmept to pick a specific response. To achieve that it will expect the data fed using a specific schema, like this:

```
{
	"text": "I am a bot",
	"audio": "/path/to/file",
	"type": "awareness",
	"tags": [
		"name"
	]
}
```


## Credits

Initiated by [Makis Tracend](http://github.com/tracend)

Distributed through [Makesites.org](http://makesites.org)


## License

Released under the [MPL v2.0](http://www.mozilla.org/MPL/2.0/) & [AGPL](http://www.gnu.org/licenses/agpl.html)
