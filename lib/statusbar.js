var $ = require('NodObjC');

var systemStatusBar = $.NSStatusBar('systemStatusBar');

function addMenu(statusItem, title) {
	var menu = $.NSMenu('alloc')('initWithTitle', $(title));
	var someitem = $.NSMenuItem('alloc')('initWithTitle', $('Test'), 'action', null, 'keyEquivalent', $('S'));
	someitem('setEnabled', $.YES);
	menu('addItem', someitem);
	statusItem('setMenu', menu);
}

exports.addItem = function(text) {
	var statusItem = systemStatusBar('statusItemWithLength', -1);
	statusItem('retain');
	statusItem('setTitle', $(text));
	return {
		addMenu: addMenu.bind(this, statusItem)
	};
};
