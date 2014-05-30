var $ = require('NodObjC');
$.import('Cocoa');

var pool = $.NSAutoreleasePool('alloc')('init');
var app = $.NSApplication('sharedApplication');

var delegate = require('./lib/common/delegate.js');
var appDelegate = delegate.create('AppDelegate', app);
appDelegate.addMethod('applicationDidFinishLaunching:', function() {
	console.log('Launch finished!');
});
appDelegate = appDelegate.delegate;

var windows = require('./lib/window.js');
var menuBar = require('./lib/menubar.js')(app);
var statusBar = require('./lib/statusbar.js');
exports.addWindow = windows.addWindow;
exports.menuBar = menuBar;
exports.statusBar = statusBar;

// This makes the app become "active" and display its menu when any window is clicked
// and brought to the foreground.
app('setActivationPolicy', $.NSApplicationActivationPolicyRegular);

exports.run = function(mode) {
	// This doesn't seem to work...
	app('activateIgnoringOtherApps', true);
	
	if (mode === 'nonblocking') {
		app('finishLaunching');
		var userInfo = $.NSDictionary(
			'dictionaryWithObject', $(1),
			'forKey', $('NSApplicationLaunchIsDefaultLaunchKey')
		);
		var notifCenter = $.NSNotificationCenter('defaultCenter');
		notifCenter(
			'postNotificationName', $.NSApplicationDidFinishLaunchingNotification,
			'object', app,
			'userInfo', userInfo
		);
		eventLoop();
	} else {
		app('run');
	}
};

// From: https://github.com/TooTallNate/NodObjC/issues/2
function eventLoop() {
	var ev;
	if(ev = app('nextEventMatchingMask', 4294967295,
			//$.NSAnyEventMask is losing precision somewhere
			'untilDate', null, // don't wait if there is no event
			'inMode', $.NSDefaultRunLoopMode,
			'dequeue', 1)) {
		app('sendEvent', ev);
	}
	app('updateWindows');

	// The faster we loop the more we segfault on button press...
	//setTimeout(eventLoop, 1);
	setImmediate(eventLoop);
}
