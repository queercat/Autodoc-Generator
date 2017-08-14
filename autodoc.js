/* Node.js Requirements */
const fs = require("file-system"); //Being used to grab the file and read it.

/* Global Constants */
const encoding = "UTF-8" //The file encoding type. 
const args = process.argv.splice(2, process.argv.length); //The arguments for the program removed the programm call and stuff.
const flags = ["help", "--help", "--dev", "--v"]; //Flags that are valid to use.

/* Global Variables */
var devEnabled = false; //Is dev enabled then add debug stuff.
var verboseEnabled = false; //Is the program set to do verbose stuff.
var filePath; //What is the path to the file that documentation is currently being generated for.
var path; //What is the path the user wants to write the doc to?

/**
 * @description Checks the arguments to see if there are flags to enable and what path is being requested.
 */
function checkArguments() {
	if (args.length <= 0) { //If not valid amount of arguments.
		displayUsage;
	}

	if (args[0].indexOf(".js") == -1) {
		console.log("Invalid file-type, expecting a Javascript file!\n");
		displayUsage();
	}

	/**
	 * @description Check the flags of the program and see if there are any to activate.
	 */
	checkFlags = function() {
		flags.forEach(flag => {
			if (args.indexOf(flag) !== -1) {
				switch(flag) {
					case "help":
						displayUsage;
						break;
					case "--help":
						displayUsage;
						break;
					case "--dev":
						devEnabled = true;
						console.log("Developer mode enabled!");
						break;
					case "--v":
						verboseEnabled = true;
						console.log("Verbose mode enabled!");
						break;
				}
			}
		});
	}

	//Loop through flags and check if there are any to enable.
	checkFlags();

	//Set the path for the file.
	filePath = args[0];
	
	//Set the path for the directory to write to.
	path = args[1];
}

/**
 * @description Display usage information about the program.
 */
function displayUsage() {
	console.log("=== Usage Information ===");
	console.log("example usage --> 'node autodoc.js <path_to_file> <optional_path_for_documentation> <optional_flags>'");
	console.log("available flags --> 'help, --help, --dev, --v'");
	failExit(); //Exit the program after displaying the usage info.
}

/**
 * @description Get the data from the file and return it.
 * @param {string} filepath the path to the file we will be processing to create documentation. 
 * @param {function} callback the function to call when we're done.
 */
function getData(filepath, callback) {
	console.log("Getting data...");
	var data;
	
	fs.readFile(filePath, encoding, (err, data) => {
		if (err != null) {
			failExit(err);
		}

		if (verboseEnabled) {
			console.log("\nReading File...");
			console.log("\n===========================================\n");
			console.log(data);
			console.log("\n===========================================\n");
		}

		this.data = data; //Set the new data to old data.
	
		callback(data); //Now execute the function.
	});
}

/**
 * @description Process the data given and evaluate it to determine lexemes and to tokenize later.
 * @param {string} data the data to process. 
 */
function processData(data) {
	if (verboseEnabled) {
		console.log("Processing Data...");
	}	
	/* Local Members */
	
	/**
	 * @description Search a string for a substring and return it's index if it exists. If not return -1. 
	 * @param {string} str the string to search.
	 * @param {string} subStr the substring to search from the string.
	 * @param {int} overload to overload the index starting point.
	 * @return {int} returning the index if the substring exists in string, if not then it will return -1.
	 */
	searchString = function(str, subStr, overload) {
		return str.indexOf(subStr, overload);	
	}

	/**
	 * @description Check if the index is valid.
	 * @param {int} index the index to check if it's valid.
	 * @return {boolean} if or if not the index exists in terms of searching a string.
	 */
	isExist = function(index) {
		return index >= 0; //This exists because I'm lazy.
	}

	parseData(data); //Parse the data and only keep the important components.
}

/**
 * @description Break down the bits and pieces of the data into only the significant parts for our purposes.
 * @param {string} data 
 */
function parseData(data) {
	if (verboseEnabled) {
		console.log("Parsing Data...");
	}
	
	/* First we want to remove the comments from the file */
	data = removeComments(data);

	/* Now we want to remove everything that is not inbetween two /** */
	data = removeInverseComments(data); //Get it? Cause we're only leaving  the specific comments now. 

	return data;
}

/**
 * @description Read through the data and look for comments. 
 * @param {string} data the data itself that we're only extracting the comments from.
 * @return {string} the data with only the comments. 
 */
function removeInverseComments(data) {
	if (verboseEnabled) {
		console.log("Isolating Comments...");
	}
	
	var comments = []; //The array we're going to push the comments to.w
	var functionNames = [];

	/* While there are still comments. */
	while (data != "") {
		var commentStart = data.indexOf("/**\r\n");
		var commentEnd = data.indexOf("*/\r\n");

		comments.push(data.slice(commentStart, commentEnd)); //Push the comment.

		data = data.slice(commentEnd + 2, data.length); //Remove that comment and keep reading.
		
		var functionName = "";

		data = data.slice(data.indexOf("{"), data.length); //Remove that function so we don't call it again.
	}

	return data;
}

/**
 * @description Remove comments from the data.
 * @param {string} data 
 * @return {string} return data without the comments.
 */
function removeComments(data) {
	if (verboseEnabled) {
		console.log("Removing comments...");
	}

	/* Comments that will be removed are (\/\*[^*].*) comments regEx(\/\/.*) and regEx(\/\*\*\*.*) */
	const commentsRemove = /(\/\*[^*].*)|(\/\/.*)|(\/\*\*\*.*)/g;
	data = data.replace(commentsRemove, ""); //Remove the comments using the regEx.

	if (verboseEnabled) {
		console.log("\nRemoved Comments")
		console.log("\n===========================================\n");
		console.log(data);
		console.log("\n===========================================\n");
	}

	return data;
}

/**
 * @description Fail the program displaying the reason why and then exiting.
 * @param {string / error} why the reason why the program failed in the form of a string or error.
 */
function failExit(why) {
	if (why !== null) { //So that if you don't put anything in just exit silently.
		console.log(why); //Display why the program has an error, etc...
	}

	process.exit(1); //Exit the program.
}

checkArguments(); //Check the arguments to see what is being argued ;)
getData(filePath, processData); //Get the data.