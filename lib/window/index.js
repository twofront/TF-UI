/*	Allows you to create windows in your application. Note that the current
	implementation requires you to define your entire window *before* calling
	`run` on your application.
*/

var $ = require('NodObjC');
var delegate = require('../common/delegate.js');

var button = require('./button');
var textfield = require('./textfield');
var label = require('./label');
var opengl = require('./opengl');

var methodNameCounter = 0;

/*	Adds a window to our application that is instantly visible.
*/
exports.addWindow = function() {
	var windowdata = {
		nswindow: null,
		delegate: null,
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
	win('setCollectionBehavior', $.NSWindowCollectionBehaviorFullScreenPrimary);

	windowdata.delegate = delegate.create('WindowDelegate', win);
	windowdata.delegate.addMethod('windowDidResize:', function() {
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
		maximize: maximize.bind(windowdata),
		addButton: button.addButton.bind(windowdata),
		addTextField: textfield.addTextField.bind(windowdata),
		addLabel: label.addLabel.bind(windowdata),
		addGL: opengl.addGL.bind(windowdata)
	}

	return windowdata.functions;
};

/*	Sets the size of the window.
*/
function setSize(x, y) {
	this.nswindow(
		'setFrame', $.NSMakeRect(0, 0, x, y),
		'display', true
	);
	return this.functions;
}

function getSize() {
	var size = this.nswindow('frame').size;
	return {x: size.width, y: size.height};
}

function setTitle(title) {
	this.title = title;
	this.nswindow('setTitle', $(title));
	return this.functions;
}

function getTitle() {
	return this.title;
}

function maximize(max) {
	var is = this.nswindow('isZoomed');
	if ((is===1 && !max) || (is===0 && max)) {
		this.nswindow('zoom', null);
	}
	return this.functions;
}
