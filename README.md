# autodoc-gen [![NPM version](https://badge.fury.io/js/autodoc-gen.svg)](https://npmjs.org/package/autodoc-gen) [![Build Status](https://travis-ci.org/nicolsek/autodoc-gen.svg?branch=master)](https://travis-ci.org/nicolsek/autodoc-generator)

## Introduction

> I'm really lazy, this is known. I decided to create something that would automatically document my node functions for me. 
> This is currently really touchy but it works for my uses.

## Code Samples

```js
     /**
	 * @localmember processData
	 * @description Search a string for a substring and return it's index if it exists. If not return -1. 
	 * @param {string} str the string to search.
	 * @param {string} subStr the substring to search from the string.
	 * @param {int} overload to overload the index starting point.
	 * @return {int} returning the index if the substring exists in string, if not then it will return -1.
	 */
```

> The interesting thing about this is that I added a new type descriptor which is the local member. It shows that if a function is within another function you can have it actually documented of the functions supposed parent.

## Installation

> Through NPM

```sh
$ npm install --save autodoc-gen
```

> Through Github
```sh
$ git clone https://github.com/nicolsek/Autodoc-Generator.git
$ npm install
```
> Now autodoc-gen is ready to be used! (Just like me in all of my relationships ;'( )

## Usage

```js
var autodocGen = require('autodoc-gen');
autodocGen();
```

```sh
$ node ./autodoc.js <PATH_TO_FILE> <OUTPUT.md> <OPTIONAL_FLAGS>
```

> An example of this...
![alt text](https://image.prntscr.com/image/QLRIp-U1QlyvahQEgfc6sA.png)

## License

MIT © [Nicole Tusek](https://github.com/nicolsek)
