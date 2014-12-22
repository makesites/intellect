// Request object
var request = {
	body: "", // input string (or other medium in the future)
	data: [], // data extracted from the body after analyzing (in text form)
	types: [], // a container for identified types of input
	state: [], // the current state to be under consideration
}

module.exports = request;
