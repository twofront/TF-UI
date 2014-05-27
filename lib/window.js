var $ = require('NodObjC');

var windows = {};

exports.addWindow = function(title) {
	var windowdata = {
		title: title,
		x: 600,
		y: 400
	};
	windows[title] = windowdata;
	return {
		setSize: setSize.bind(this, title)
	};
};

exports.init = function() {
	// Setup any windows.
	for (var e in windows) {
		var d = windows[e];
		var style = $.NSClosableWindowMask | $.NSResizableWindowMask | $.NSMiniaturizableWindowMask
			| $.NSTitledWindowMask;
		
		var win = $.NSWindow('alloc')(
			'initWithContentRect', $.NSMakeRect(0, 0, d.x, d.y),
			'styleMask', style,
			'backing', $.NSBackingStoreBuffered,
			'defer', false
		);

		win('cascadeTopLeftFromPoint', $.NSMakePoint(20, 20));
		if (d.title) win('setTitle', $(d.title));
		win('makeKeyAndOrderFront', win);
	}
};

function setSize(win, x, y) {
	windows[win].x = x;
	windows[win].y = y;
	return {
		setSize: setSize.bind(this, win)
	};
}
