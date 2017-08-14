/* Node.js requirements */
const args = process.argv.slice(2, process.argv.length); //Cut off the first two elements which are just the calls to the program and the name of the program itself.
const fs = require('file-system');

/* Global Vars */
const encodingType = "UTF-8"
var functions = []; //The functions and their descriptors.
var descriptors = [];

if (args <= 0 || args.indexOf("help") != -1 || args.indexOf("--help") != -1) { //Checking to make sure that the arguments specified are valid.
	displayUsage();
	failExit();
}

/**
 * Read through a file specified with the encoding of encoding.
 * @param  {string} filename used to get the path of the file to read.
 * @param  {string} encoding the specific type of encoding when reading the file.
 */
function readfile(filename, encoding) {
	fs.readFile(filename, encoding, (err, data) => { //Read the file.
		if (err != null) {
			failExit(err);
		}

		processData(data);
	});
}

/**
 * @description Process the data of an assumed file stream.
 * @param {string} data the data being processed.
 */
function processData(data) {

	data = removeComments(data); //Remove the comments from the program.

	while (data.indexOf("/**") !== -1) { //While there still exists doc comments.
		var commentStart = data.indexOf("/**"); //Get the start of the comment.
		var commentEnd = data.indexOf("*/") + 2; //Get the end of the comment.

		var doc = data.slice(commentStart + 3, commentEnd - 2); //Create the documentation block and remove the first /** structure and the last / structure.

		var lines = [];

		while (doc) {
			lexPos = doc.indexOf("*");
			var line = doc.slice(lexPos + 1, doc.indexOf("*", lexPos + 1)); //The line is is equal to the substr of the doc where * starts and the next * stars.
			lines.push(line.trim());
			doc = doc.slice(line.length + 1, doc.length);
		}

		lines.pop(); //Remove last element as for some reason weird issue with copying.

		var name; //Name of the function.

		data = data.slice(commentEnd + 2, data.length); //Remove the comment so we don't parse it again.

		var functionStart = 0; //Get the start of where the function is.
		var functionEnd = data.indexOf("{"); //Get the end of where the function is.

		var functionLine = data.slice(functionStart, functionEnd).trim();

		if (functionLine.indexOf("=") !== -1) {
			name = functionLine.slice(0, functionLine.indexOf("=") - 1).trim();
		} else {
			name = functionLine.slice(functionLine.indexOf("function") + "function".length, functionLine.indexOf("(")).trim();
		}

		var data = data.slice(data.indexOf("/**"), data.length);

		functions.push(name); //Push the names of the functions to the function array.
		descriptors.push(lines); //Push the descriptors to the descriptors array.

		createDocumentation();
	}
}

/**
 * Remove all comments from the input data.
 * @param {string} data the data being input.
 * @return {string} the data with the comments removed. 
 */
function removeComments(data) {
		var regEx = /(\/\/)|(\/\*[^*].*)|(\/\*\*\*.*).*|/g //Reg ex to remove comments. such as /* */ or // or even /********************************** */ just not /**
		var regEx2 = /{([^}]+)}/g
		data = data.replace(regEx, ''); //Remove all comments.
		data = data.replace(regEx2, ''); //Remove all things inside braces.

		console.log(data);

		return data;
}

/**
 * Create the documentation.
 */
function createDocumentation() {
	console.log(functions);
	console.log(descriptors);
}		

/**
 * @description Display usage information about the program.
 */
function displayUsage() {
	console.log("Usage Info... Add later.");
}

/**
 * @description Fail and exit the program after displaying the arguments of why.
 * @param {string / err} why optional 
 */
function failExit(why) {
	if (why != null) {
		console.log(why);
	}

	process.exit(-1);
}

readfile(args[0], encodingType);