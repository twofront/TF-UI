var $ = require('NodObjC');

var systemStatusBar = $.NSStatusBar('systemStatusBar');

exports.addItem = function(text) {
	var statusItem = systemStatusBar('statusItemWithLength', $.NSVariableStatusItemLength);
	statusItem('retain');
	statusItem('setTitle', $(text));
};
