# checkArguments()

Checks the arguments to see if there are flags to enable and what path is being requested.
## local checkFlags()
Check the flags of the program and see if there are any to activate.
# displayUsage()

Display usage information about the program.
# getData()

Get the data from the file and return it.
# processData()

Process the data given and evaluate it to determine lexemes and to tokenize later.
## local searchString()
Search a string for a substring and return it's index if it exists. If not return -1.
{int} returning the index if the substring exists in string, if not then it will return -1.
# parseData()

Break down the bits and pieces of the data into only the significant parts for our purposes.
## local isExist()
Check if the index is valid.
{boolean} if or if not the index exists in terms of searching a string.
# removeInverseComments()

Read through the data and look for comments.
# processComments()

Process the comments with the function names and create a tree of comments in a sort of XML style format.
## local parseInformation()
Parse the comment specified and extract the description, parameter element, return element, and if it's a local memeber.
# writeDoc()

Write the documentation into the path specified.
# writeToFile()

Write to a file specified with the data specified.
# removeComments()

Remove comments from the data.
{string} return data without the comments.
# failExit()

Fail the program displaying the reason why and then exiting.
