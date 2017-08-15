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
var path = "./DOC.md"; //What is the path the user wants to write the doc to?

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
	 * @localmember checkArguments
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
	if (args[1] != "" && args[1] != null) {
		path = args[1];
	}
}

/**
 * @description Display usage information about the program.
 */
function displayUsage() {
	console.log("=== Usage Information ===");
	console.log("example usage --> 'node autodoc.js <path_to_file> <optional_filename_for_documentation> <optional_flags>'");
	console.log("available flags --> 'help, --help, --dev, --v'");
	failExit(); //Exit the program after displaying the usage info.
}

/**
 * @description Get the data from the file and return it.
 * @param {string} filepath the path to the file we will be processing to create documentation. 
 * @param {function} callback the function to call when we're done.
 */
function getData(filepath, callback) {
	if (verboseEnabled) {
		console.log("Getting Data!");
	}

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
	 * @localmember processData
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
	 * @localmember processData
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
 * @param {string} data the data we'll be parsing.
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
		
		var functionStart = 0;
		var functionEnd = data.indexOf(")"); //Get the end of the function line.

		var functionLine = data.slice(functionStart, functionEnd);
		var isFunction = functionLine.indexOf("function") !== - 1;

		var functionName = "";

		if (isFunction) {
			if (functionLine.indexOf("= function") !== -1) {
				functionName = functionLine.slice(0, functionLine.indexOf("=")).trim(); //If there is an (x) = function then get the [xFunction] = part.
			} else {
				functionName = functionLine.slice(functionLine.indexOf("function") + "function".length, functionLine.indexOf("(")).trim();
			}

			functionNames.push(functionName); //Push the function name.			
		}
	
		data = data.slice(data.indexOf("{"), data.length); //Remove that function so we don't call it again.
	}

	if (verboseEnabled) {
		console.log("Comments have been isolated!");
	}

	/* Now that we're done with this portion we just need to process the comments */
	processComments(comments, functionNames);
}

/**
 * @description Process the comments with the function names and create a tree of comments in a sort of XML style format.
 * @param {string[]} comments the comments as an array.
 * @param {string[]} functionNames  the functions as an array.
 */
function processComments(comments, functionNames) {
	if (verboseEnabled) {
		console.log("Processing comments...");
	}
	
	var data = ""; //The data we will be sending to the doc.	

	/**
	 * @localmember processComments
	 * @description Parse the comment specified and extract the description, parameter element, return element, and if it's a local memeber.
	 * @param {string} comment the comment being parsed.
	 * @param {string} name the name of the function being parsed.
	 * @param {function} callback the callback to execute when done.
	 */
	parseInformation = function(comment, name, callback) {
		/* Local Variables */
		var desc = ""; 
		var param = [];
		var ret = "";
		var local = false;

		/* Get local member */
		local = (comment.indexOf("@local") !== -1);

		/* Get description */
		var descPosition = comment.indexOf("@desc");
		var descPositionOther = comment.indexOf("@description");

		if (descPosition !== -1) {
			if (descPositionOther !== -1) {
				desc = comment.slice(descPositionOther + "@description".length, comment.indexOf("\r\n", descPosition)).trim();
			} else {
				desc = comment.slice(descPosition + "@desc".length, comment.indexOf("\r\n", descPosition)).trim();				
			}

		} else {
			console.log("Warning! Unable to find function description for --> " + name);
			console.log("You can surpress warnings by adding the flag --Supress or -W to the arguments");
		}

		/* Get return description */
		var returnPosition = comment.indexOf("@ret");
		var returnPositionOther = comment.indexOf("@return");

		if (descPosition !== -1) {
			if (returnPositionOther !== -1) {
				ret = comment.slice(returnPositionOther + "@return".length, comment.indexOf("\r\n", returnPosition)).trim();
			} else {
				ret = comment.slice(returnPosition + "@ret".length, comment.indexOf("\r\n", returnPosition)).trim();				
			}
		}

		/* Get parameters */
		while (comment.indexOf("@param") !== -1) {
			var paramIndex = comment.indexOf("@param");
			param.push(comment.slice(paramIndex + "@param".length, comment.indexOf("\r\n", paramIndex)).trim());

			comment = comment.slice(comment.indexOf("\r\n", paramIndex) + 1, comment.length);
		}

		/* Write it to documentation */
		callback(name, desc, param, local, ret);
	}

	for (functionDoc = 0; functionDoc < functionNames.length; functionDoc++) {
		parseInformation(comments[functionDoc], functionNames[functionDoc], writeDoc); //Parse the information and send it a callback.
	}
}

/**
 * @description Write the documentation into the path specified.
 * @param {string} desc description of the function.
 * @param {string[]} param parameters of the function. 
 * @param {bool} local if it's local then the description of to what function.
 * @param {string} ret what it returns if it returns anything.
 */
function writeDoc(name, desc, param, local, ret) {
	var data = ""; //The data we will being writing.
	
	var highlightStart = "```javascript\n";
	var highlightEnd = "```\n";

	var names = []; //The param names.
	var types = []; //The param types.
	var descriptions = []; //The param descriptions.

	/* Adding the parameters */
	param.forEach(val => {
		var startName = val.indexOf("}");
		var endName = val.indexOf(" ", startName + 2);

		var startType = val.indexOf("{");

		if (endName === -1) {
			endName = val.indexOf("\n", startName);
		}

		if (startType !== -1 && startName !== -1) {
			types.push(val.slice(startType + 1, startName).trim()); //Push the type.
			descriptions.push(val.slice(endName + 1, val.length).trim()); //Push the description.			
			names.push(val.slice(startName + 2, endName + 1).trim()); //Push the name to the array.
		}
	});

	var paramStructure = ""; //The param's we're going to put in the function head.
	if (names.length != 0) {
		for (nam = 0; nam < names.length; nam++) {
			if (nam != names.length - 1) {
				paramStructure += names[nam] + ", ";
			} else {
				paramStructure += names[nam];
			}
		}
	}

	if (verboseEnabled) {
		console.log("Processed comments!"); //Cause lazy and don't want to change callbacks.
		console.log("Writing documentation...");
	}

	/* If it isn't a local function */
	if (!local) {
		data += "# " + name + "(" + paramStructure + ")\n" + "\n"; //The big header.
	} else {
		data += "## local " + name + "()\n"; //Medium header for local functions.
	}

	/* Adding the description */
	data += desc + "\n"; //The description.

	if (param != 0) {
		data += "\n| Param | Type | Description |\n";
		data += "| --- | --- | ---\n";
	}

	for (elem = 0; elem < param.length; elem++) {
		data += "| " + names[elem] + " | " + types[elem] + " | " + descriptions[elem] + "|\n";
	}

	/* Adding the return stuff */
	if (ret != "") {
		data += "\n| Return Type | Description |\n";
		data += "| --- | --- |\n";

		var typeStart = ret.indexOf("{");
		var typeEnd = ret.indexOf("}");

		var type = ret.slice(typeStart + 1, typeEnd); //The type of the return
		var description = ret.slice(typeEnd + 2, data.length); //The description of the return.

		data += "| " + type + " | " + description + " |\n";
	}

	/**
	 * @description Write to a file specified with the data specified.
	 * @param {string} data the data to write.
	 * @param {string} path the path to write to.
	 */
	writeToFile = function(data, path) {
		var writeStream = fs.createWriteStream(path, {flags: 'a'});
		writeStream.write(data);
		writeStream.close();
	}

	/* Data is all done! Time to write */
	writeToFile(data, path);
}

/**
 * @description Remove comments from the data.
 * @param {string} data the data recieved that we will be removing comments from. 
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