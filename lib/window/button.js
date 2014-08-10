
var $ = require('NodObjC');

/*	Adds a button to the window. Note that our window can be accessed using
	the `this` keyword (because this function will only ever be called after
	`bind` is used to set a window).
*/
module.exports.addButton = function(text, x, y, width, height) {
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
	var methodname = this.parent.delegate.addMethod(action);
	this.nsbutton('setAction', methodname);
	return this.functions;
}
