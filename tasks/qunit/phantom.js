/*
 * A modification of the default included in with grunt
 *
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 *
 * Based on: https://github.com/johnbender/grunt-junit
 */

/*global phantom:true*/

// NOTE custom phantomjs file system module
var fs = require('fs'),
	system = require('system');

// The temporary file used for communications.
var tmpfile = phantom.args[0];
// The QUnit helper file to be injected.
var qunit = phantom.args[1];
// The QUnit .html test file to run.
var url = phantom.args[2];

// Keep track of the last time a QUnit message was sent.
var last = new Date();

// Use the pathname and query string params to determine the file name
var suiteName = url;
if (suiteName.match(/https?:\/\//)) {
	suiteName = suiteName.replace(/https?:\/\/[^\/]+\//);
}
else if (system.env['QUNIT_TAP_PREFIX']) {
	suiteName = suiteName.replace(system.env['QUNIT_TAP_PREFIX'], '');
}

var resultsFilename = suiteName
		.replace(/\.[a-z]+$/, "")
		.replace(/[\/=\?]/g, "-")
		.replace(/^\-|\-$/g, "")
		.replace(/\-+/g, "-");

var buildOutpuDir = system.env['QUNIT_TAP_OUTPUT'];

if (!fs.exists(buildOutpuDir)) {
	fs.makeDirectory(buildOutpuDir);
}

resultsFilename = buildOutpuDir + resultsFilename + ".tap";

if (fs.exists(resultsFilename)) {
	fs.remove(resultsFilename);
}

// Messages are sent to the parent by appending them to the tempfile.
function sendMessage(args) {
	last = new Date();

	fs.write(tmpfile, JSON.stringify(args) + '\n', 'a');

	// Exit when all done.
	if (/^done/.test(args[0])) {
		fs.write(resultsFilename, args[5], "a");
		phantom.exit();
	}
}

// Send a debugging message.
function sendDebugMessage() {
	sendMessage(['debug'].concat([].slice.call(arguments)));
}

// Abort if QUnit doesn't do anything for a while.
setInterval(function() {
	if (new Date() - last > 5000) {
		sendMessage(['done_timeout']);
	}
}, 1000);

// Create a new page.
var page = require('webpage').create();

// QUnit sends its messages via alert(jsonstring);
page.onAlert = function(args) {
	sendMessage(JSON.parse(args));
};

// Keep track if QUnit has been injected already.
var injected;

// Additional message sending
page.onConsoleMessage = function(message) {
	sendMessage(['console', message]);
};
page.onResourceRequested = function(request) {
	if (/\/qunit\.js$/.test(request.url)) {
		// Reset injected to false, if for some reason a redirect occurred and
		// the test page (including qunit.js) had to be re-requested.
		injected = false;
	}
	// sendDebugMessage('onResourceRequested', request.url);
};
page.onResourceReceived = function(request) {
	if (request.stage === 'end') {
		// sendDebugMessage('onResourceReceived', request.url);
	}
};

page.open(url, function(status) {
	// Only execute this code if QUnit has not yet been injected.
	if (injected) { return; }
	injected = true;
	// The window has loaded.
	if (status !== 'success') {
		// File loading failure.
		sendMessage(['done_fail', url]);
	} else {
		// Inject QUnit helper file.
		sendDebugMessage('inject', qunit);
		page.injectJs(qunit);
		// Because injection happens after window load, "begin" must be sent
		// manually.
		sendMessage(['begin']);
	}
});
