var $ = require('NodObjC');

var methodNameCounter = 0;

var app = null;
var delegate = null;
var cl = {};

var menuBar = null;
var menus = {};

function init() {
	menuBar = $.NSMenu('alloc')('init');
	app('setMainMenu', menuBar);

	cl.addMenu('_main');
	cl.addItem('_main', 'Quit TFUI', 'q', 'terminate:');
}

cl.addMenu = function(name) {
	// Add the item to the top bar.
	var appMenuItem = $.NSMenuItem('alloc')('init');
	appMenuItem('setTitle', $(name));

	// Add a dropdown for when clicked.
	var appMenu = $.NSMenu('alloc')('init');
	appMenu('setTitle', $(name));
	appMenuItem('setSubmenu', appMenu);

	menuBar('addItem', appMenuItem);

	menus[name] = appMenu;

	return {
		addItem: cl.addItem.bind(this, name)
	};
};

cl.addItem = function(menu, name, shortcut, callback) {
	var methodname = 'Method'+methodNameCounter+':';
	methodNameCounter++;
	if (typeof(callback) === 'function') {
		delegate.addMethod(methodname, 'v@:@', callback);
	} else if (typeof(callback) === 'string') {
		methodname = callback;
	}

	var quitMenuItem = $.NSMenuItem('alloc')(
		'initWithTitle', $(name),
		'action', methodname,
		'keyEquivalent', $(shortcut ? shortcut : '')
	);
	menus[menu]('addItem', quitMenuItem);
	return {
		addItem: cl.addItem.bind(this, menu)
	};
};

module.exports = function(appl, dele) {
	app = appl;
	delegate = dele;
	init();
	return cl;
};
