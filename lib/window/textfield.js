
var $ = require('NodObjC');
var delegate = require('../common/delegate.js');

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
		onReturn: onTextFieldReturn.bind(fielddata),
		getValue: getTextFieldValue.bind(fielddata),
		setValue: setTextFieldValue.bind(fielddata),
		focus: focusTextField.bind(fielddata)
	};
	this.children.push(fielddata);

	var d = delegate.create('TextFieldDelegate', but);
	d.addMethod('controlTextDidChange', function() {
		console.log('a');
	});

	return fielddata.functions;
}

function onTextFieldReturn(action) {
	this.clickEvent = action;
	var methodname = this.parent.delegate.addMethod(action);
	this.nstextfield('setAction', methodname);
	return this.functions;
}

function getTextFieldValue() {
	return this.nstextfield('stringValue');
}

function setTextFieldValue(val) {
	this.nstextfield('setStringValue', $(val));
	return this.functions;
}

function focusTextField() {
	this.nstextfield('becomeFirstResponder');
	return this.functions;
}
