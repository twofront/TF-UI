var $ = require('NodObjC');
$.import('Foundation');
$.import('Cocoa');

var pool = $.NSAutoreleasePool('alloc')('init');
var app = $.NSApplication('sharedApplication');

var appDelegate = $.NSObject.extend('AppDelegate');
appDelegate.addMethod('test:', 'v@:@', function () {
	console.log('test');
});
appDelegate.register();

var delegate = appDelegate('alloc')('init');
app('setDelegate', delegate);

var windows = require('./lib/window.js');
var menuBar = require('./lib/menubar.js')(app, appDelegate);
var statusBar = require('./lib/statusbar.js');
exports.addWindow = windows.addWindow;
exports.menuBar = menuBar;
exports.statusBar = statusBar;

// This make the app become "active" and display its menu when any window is clicked
// and brought to the foreground.
app('setActivationPolicy', $.NSApplicationActivationPolicyRegular);

exports.run = function() {
	windows.init();
	app('activateIgnoringOtherApps', true);
	app('run');
	pool('release');
};
