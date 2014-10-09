var $ = require('NodObjC');
require('uvcf').ref();
$.import('Cocoa');

var pool = $.NSAutoreleasePool('alloc')('init');
var app = $.NSApplication('sharedApplication');

var delegate = require('./lib/common/delegate.js');
var appDelegate = delegate.create('AppDelegate', app);

var windows = require('./lib/window');
var menuBar = require('./lib/menubar')(app);
var statusBar = require('./lib/statusbar');
var audio = require('./lib/audio');
exports.addWindow = windows.addWindow;
exports.menuBar = menuBar;
exports.statusBar = statusBar;
exports.audio = audio;
exports.chooseFile = function() {
	var panel = $.NSOpenPanel('openPanel');
	if (panel('runModalForDirectory', null, 'file', null) === $.NSOKButton) {
		var nsfiles = panel('filenames');
		var files = [];
		for (var i=0; i<nsfiles('count'); i++) {
			files.push(nsfiles('objectAtIndex', i)+'');
		}
		return files;
	}
	return null;
}

// This makes the app become "active" and display its menu when any window is clicked
// and brought to the foreground.
app('setActivationPolicy', $.NSApplicationActivationPolicyRegular);

exports.run = function(callback) {
	// This doesn't seem to work...
	app('activateIgnoringOtherApps', true);
	setImmediate(callback);
	app('run');
};
