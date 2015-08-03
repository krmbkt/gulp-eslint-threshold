'use strict';

var TransformStream = require('stream').Transform;

function gulpEslintThreshold() {
}

/**
 * Count the warnings in the ESLint result, then call a callback function if the threshold is met
 */
gulpEslintThreshold.afterWarnings = function(minWarnings, callback) {
	var stream = new TransformStream({
			objectMode: true
		}),
		eslintWarnings = 0;

	stream._transform = function(chunk, encoding, done) {
		var messages = chunk.eslint && chunk.eslint.messages || [];

		messages.some(function(message) {
			if(message.severity === 1) { // 1 warning, 2 error
				eslintWarnings++;
			}
		});

		return done(null, chunk);
	};

	stream._flush = function(done) {
        // Call the callback function if the number of warnings found by ESLint is equal to or greater than minWarnings
		if(eslintWarnings >= minWarnings && typeof callback === 'function') {
			callback(eslintWarnings);
		}
		done();
	};

	return stream;
};

gulpEslintThreshold.afterErrors = function(minErrors, callback) {
	var stream = new TransformStream({
			objectMode: true
		}),
		eslintErrors = 0;

	stream._transform = function(chunk, encoding, done) {
		var messages = chunk.eslint && chunk.eslint.messages || [];

		messages.some(function(message) {
			if(message.severity === 2) { // 1 warning, 2 error
				eslintErrors++;
			}
		});

		return done(null, chunk);
	};

	stream._flush = function(done) {
        // Call the callback function if the number of errors found by ESLint is equal to or greater than minErrors
		if(eslintErrors >= minErrors && typeof callback === 'function') {
			callback(eslintErrors);
		}
		done();
	};

	return stream;
};

module.exports = gulpEslintThreshold;
