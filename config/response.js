// Response object
var response = {
	format: "text", // defining the media format used for the output - options: text, audio, emoji
	type: "number",  // giving context to the response - options: number, word, sentence, place, time, awareness, preference, abstract
	data: "", // the actuall response data
	results: {}, // a container for saving the processing results of each individual middleware
	tags: [] // an array of keywords describing the response
}

module.exports = response;
