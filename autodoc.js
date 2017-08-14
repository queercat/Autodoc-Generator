/* Node.js Requirements */
const fs = require("file-system"); //Being used to grab the file and read it.

/* Global Constants */
const encoding = "UTF-8" //The file encoding type. 
const args = process.argv.splice(2, process.argv.length); //The arguments for the program removed the programm call and stuff.
const flags = ["help", "--help", "--dev", "--v"]; //Flags that are valid to use.

/* Global Variables */
var devEnabled; //Is dev enabled then add debug stuff.
var verboseEnabled; //Is the program set to do verbose stuff.
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
 * @return {string} the data we will be returning from the file.
 */
function getData(filepath) {
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

		return data;
	});
}

/**
 * @description Process the data given and evaluate it to determine lexemes and to tokenize later.
 * @param {string} data the data to process. 
 */
function processData(data) {
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
processData(getData(filePath)); //Get and process the data from the file.