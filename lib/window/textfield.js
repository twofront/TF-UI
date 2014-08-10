
var $ = require('NodObjC');

module.exports.addTextField = function(x, y, width, height) {
	var fielddata = {
		type: 'field',
		x: x,
		y: y,
		width: width,
		height: height,
		clickEvent: null,
		parent: this
	};

	var but = $.NSTextField('alloc')('init');
	this.nswindow('contentView')(
		'addSubview', but
	);
	but('setFrame', $.NSMakeRect(x, y, width, height));

	fielddata.nstextfield = but;
	fielddata.functions = {
		onReturn: onTextFieldReturn.bind(fielddata)
	};
	this.children.push(fielddata);
	return fielddata.functions;
}

function onTextFieldReturn(action) {
	this.clickEvent = action;
	var methodname = this.parent.delegate.addMethod(action);
	this.nstextfield('setAction', methodname);
	return this.functions;
}
