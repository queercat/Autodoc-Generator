# checkArguments()

Checks the arguments to see if there are flags to enable and what path is being requested.
## local checkFlags()
Check the flags of the program and see if there are any to activate.
# displayUsage()

Display usage information about the program.
# getData(filepath, callback)

Get the data from the file and return it.
Param | Type | Description
--- | --- | ---
filepath | 1 | filepath the path to the file we will be processing to create documentation.
callback | 16 | callback the function to call when we're done.
# processData(data)

Process the data given and evaluate it to determine lexemes and to tokenize later.
Param | Type | Description
--- | --- | ---
data | 1 | data the data to process.
## local searchString()
Search a string for a substring and return it's index if it exists. If not return -1.
Param | Type | Description
--- | --- | ---
str | 1 | str the string to search.
subStr | 11 | subStr the substring to search from the string.
overload | 1 | overload to overload the index starting point.
{int} returning the index if the substring exists in string, if not then it will return -1.
## local isExist()
Check if the index is valid.
Param | Type | Description
--- | --- | ---
index | 1 | index the index to check if it's valid.
{boolean} if or if not the index exists in terms of searching a string.
# parseData(data)

Break down the bits and pieces of the data into only the significant parts for our purposes.
Param | Type | Description
--- | --- | ---
data | 1 | data the data we'll be parsing.
# removeInverseComments(data)

Read through the data and look for comments.
Param | Type | Description
--- | --- | ---
data | 1 | data the data itself that we're only extracting the comments from.
# processComments(comments, functionNames)

Process the comments with the function names and create a tree of comments in a sort of XML style format.
Param | Type | Description
--- | --- | ---
comments | 1 | comments the comments as an array.
functionNames | 18 | functionNames  the functions as an array.
## local parseInformation()
Parse the comment specified and extract the description, parameter element, return element, and if it's a local memeber.
Param | Type | Description
--- | --- | ---
comment | 1 | comment the comment being parsed.
name | 15 | name the name of the function being parsed.
callback | 1 | callback the callback to execute when done.
# writeDoc(desc, param, local, ret)

Write the documentation into the path specified.
Param | Type | Description
--- | --- | ---
desc | 1 | desc description of the function.
param | 12 | param parameters of the function.
local | 1 | local if it's local then the description of to what function.
ret | 15 | ret what it returns if it returns anything.
# writeToFile(data, path)

Write to a file specified with the data specified.
Param | Type | Description
--- | --- | ---
data | 1 | data the data to write.
path | 12 | path the path to write to.
# removeComments()

Remove comments from the data.
Param | Type | Description
--- | --- | ---
 | 1 | data
{string} return data without the comments.
# failExit(why)

Fail the program displaying the reason why and then exiting.
Param | Type | Description
--- | --- | ---
why | 1 | why the reason why the program failed in the form of a string or error.
