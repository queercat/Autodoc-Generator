/* Node.js requirements */
const args = process.argv.slice(2, process.argv.length); //Cut off the first two elements which are just the calls to the program and the name of the program itself.
const fs = require('file-system');

/* Global Vars */
const encodingType = "UTF-8"

var lexemes = ["/**", "*/", "*", "@", "//"]; //List of special combination of words to look for.

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
 * @param  {string} data the data being processed
 */
function processData(data) {
	while (data.indexOf(lexemes[0]) !== -1) { //While there still exists doc comments.
		var commentStart = data.indexOf(lexemes[0]); //Get the start of the comment.
		var commentEnd = data.indexOf(lexemes[1]) + 2; //Get the end of the comment.

		var doc = data.slice(commentStart + 3, commentEnd - 2); //Create the documentation block and remove the first /** structure and the last / structure.

		while (doc != "") {
			console.log(1);
		}

		data = data.slice(commentEnd + 2, data.length); //Remove the comment so we don't comment it again.
	}

	console.log(data);
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