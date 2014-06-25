var $ = require('NodObjC');
require('uvcf').ref();
$.import('Cocoa');

var pool = $.NSAutoreleasePool('alloc')('init');
var app = $.NSApplication('sharedApplication');

var delegate = require('./lib/common/delegate.js');
var appDelegate = delegate.create('AppDelegate', app);

var windows = require('./lib/window.js');
var menuBar = require('./lib/menubar.js')(app);
var statusBar = require('./lib/statusbar.js');
exports.addWindow = windows.addWindow;
exports.menuBar = menuBar;
exports.statusBar = statusBar;

// This makes the app become "active" and display its menu when any window is clicked
// and brought to the foreground.
app('setActivationPolicy', $.NSApplicationActivationPolicyRegular);

exports.run = function(callback) {
	// This doesn't seem to work...
	app('activateIgnoringOtherApps', true);
	setImmediate(callback);
	app('run');
};
