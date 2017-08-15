# checkArguments()

Checks the arguments to see if there are flags to enable and what path is being requested.
## local checkFlags()
Check the flags of the program and see if there are any to activate.
# displayUsage()

Display usage information about the program.
# getData(filepath, callback)

Get the data from the file and return it.

| Param | Type | Description |
| --- | --- | ---
| filepath | string | the path to the file we will be processing to create documentation.|
| callback | function | the function to call when we're done.|
# processData(data)

Process the data given and evaluate it to determine lexemes and to tokenize later.

| Param | Type | Description |
| --- | --- | ---
| data | string | the data to process.|
## local isExist()
Check if the index is valid.

| Param | Type | Description |
| --- | --- | ---
| index | int | the index to check if it's valid.|

| Return Type | Description |
| --- | --- |
| boolean | if or if not the index exists in terms of searching a string. |
## local searchString()
Search a string for a substring and return it's index if it exists. If not return -1.

| Param | Type | Description |
| --- | --- | ---
| str | string | the string to search.|
| subStr | string | the substring to search from the string.|
| overload | int | to overload the index starting point.|

| Return Type | Description |
| --- | --- |
| int | returning the index if the substring exists in string, if not then it will return -1. |
# parseData(data)

Break down the bits and pieces of the data into only the significant parts for our purposes.

| Param | Type | Description |
| --- | --- | ---
| data | string | the data we'll be parsing.|
# removeInverseComments(data)

Read through the data and look for comments.

| Param | Type | Description |
| --- | --- | ---
| data | string | the data itself that we're only extracting the comments from.|
## local parseInformation()
Parse the comment specified and extract the description, parameter element, return element, and if it's a local memeber.

| Param | Type | Description |
| --- | --- | ---
| comment | string | the comment being parsed.|
| name | string | the name of the function being parsed.|
| callback | function | the callback to execute when done.|
# processComments(comments, functionNames)

Process the comments with the function names and create a tree of comments in a sort of XML style format.

| Param | Type | Description |
| --- | --- | ---
| comments | string[] | the comments as an array.|
| functionNames | string[] | the functions as an array.|
# writeDoc(desc, param, local, ret)

Write the documentation into the path specified.

| Param | Type | Description |
| --- | --- | ---
| desc | string | description of the function.|
| param | string[] | parameters of the function.|
| local | bool | if it's local then the description of to what function.|
| ret | string | what it returns if it returns anything.|
# writeToFile(data, path)

Write to a file specified with the data specified.

| Param | Type | Description |
| --- | --- | ---
| data | string | the data to write.|
| path | string | the path to write to.|
# removeComments(data)

Remove comments from the data.

| Param | Type | Description |
| --- | --- | ---
| data | string | the data recieved that we will be removing comments from.|

| Return Type | Description |
| --- | --- |
| string | return data without the comments. |
# failExit(why)

Fail the program displaying the reason why and then exiting.

| Param | Type | Description |
| --- | --- | ---
| why | string / error | the reason why the program failed in the form of a string or error.|
