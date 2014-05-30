/*	Allows you to create windows in your application. Note that the current
	implementation requires you to define your entire window *before* calling
	`run` on your application.
*/

var $ = require('NodObjC');
var delegate = require('./common/delegate.js');

var methodNameCounter = 0;
var winDelegate = null;

/*	Adds a window to our application that is instantly visible.
*/
exports.addWindow = function() {
	var windowdata = {
		nswindow: null,
		title: null,
		x: 600,
		y: 400,
		children: [],
		functions: null
	};

	var windowStyle = $.NSClosableWindowMask | $.NSResizableWindowMask | $.NSMiniaturizableWindowMask | $.NSTitledWindowMask;
	var win = $.NSWindow('alloc')(
		'initWithContentRect', $.NSMakeRect(0, 0, windowdata.x, windowdata.y),
		'styleMask', windowStyle,
		'backing', $.NSBackingStoreBuffered,
		'defer', false
	);

	winDelegate = delegate.create('WindowDelegate', win);
	winDelegate.addMethod('windowDidResize:', 'v@:@', function() {
		console.log('Resized...');
	});

	win('cascadeTopLeftFromPoint', $.NSMakePoint(20, 20));
	win('makeKeyAndOrderFront', win);
	
	windowdata.nswindow = win;
	windowdata.functions = {
		setSize: setSize.bind(windowdata),
		getSize: getSize.bind(windowdata),
		setTitle: setTitle.bind(windowdata),
		getTitle: getTitle.bind(windowdata),
		addButton: addButton.bind(windowdata)
	}

	return windowdata.functions;
};

/*	Sets the size of the window.
*/
function setSize(x, y) {
	this.x = x;
	this.y = y;
	this.nswindow(
		'setFrame', $.NSMakeRect(0, 0, x, y),
		'display', true
	);
	return this.functions;
}

function getSize(win) {
	return {x: this.x, y: this.y};
}

function setTitle(title) {
	this.title = title;
	this.nswindow('setTitle', $(title));
	return this.functions;
}

function getTitle() {
	return this.title;
}

/*	Adds a button to the window. Note that our window can be accessed using
	the `this` keyword (because this function will only ever be called after
	`bind` is used to set a window).
*/
function addButton(text, x, y, width, height) {
	console.log(text);
	var buttondata = {
		type: 'button',
		text: text,
		x: x,
		y: y,
		width: width,
		height: height,
		clickEvent: null,
		parent: this
	};

	var but = $.NSButton('alloc')('init');
	this.nswindow('contentView')(
		'addSubview', but
	);
	but('setTitle', $(text));
	but('setButtonType', $.NSMomentaryLightButton);
	but('setBezelStyle', $.NSRoundedBezelStyle);
	
	but('setFrame', $.NSMakeRect(x, y, width, height));

	buttondata.nsbutton = but;
	buttondata.functions = {
		onClick: onButtonClick.bind(buttondata)
	};
	this.children.push(buttondata);
	return buttondata.functions;
}

/*	Sets the size of the defined button in the defined window.
*/
function onButtonClick(action) {
	this.clickEvent = action;
	var methodname = winDelegate.addMethod(action);
	this.nsbutton('setAction', methodname);
	return this.functions;
}
