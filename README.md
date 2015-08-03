# gulp-eslint-threshold

A simple gulp stream plugin for counting warnings from [gulp-eslint](https://www.npmjs.com/package/gulp-eslint) and call a callback function when the number rises above a threshold you set.

## Installation

```sh
npm install gulp-eslint-threshold
```

## Usage
```js
'use strict';

var gulp = require('gulp'),
	eslint = require('gulp-eslint'),
	eslintThreshold = require('gulp-eslint-threshold');

gulp.task('eslint', function() {
	var thresholdWarnings = 3;

	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslintThreshold.afterWarnings(thresholdWarnings, function (numberOfWarnings) {
			throw new Error('ESLint warnings (' + numberOfWarnings + ') equal to or greater than the threshold (' + thresholdWarnings + ')');
		}));
});

gulp.task('default', ['eslint']);
```

### Configuration

`afterWarnings(minWarnings, callbackFunction)`

- `minWarnings`, a number for the threshold.
- `callbackFunction(eslintWarnings)`, a callback function for when the threshold is met. The argument `eslintWarnings` is the number of warnings found by ESLint.

`afterErrors(minErrors, callbackFunction)`

- `minErrors`, a number for the threshold.
- `callbackFunction(eslintErrors)`, a callback function for when the threshold is met. The argument `eslintErrors` is the number of errors found by ESLint.
