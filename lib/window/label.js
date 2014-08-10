
var $ = require('NodObjC');

module.exports.addLabel = function(text, x, y, width, height) {
	var fielddata = {
		type: 'label',
		nstextfield: null,
		x: x,
		y: y,
		width: width,
		height: height,
		clickEvent: null,
		parent: this,
		functions: {}
	};

	var field = $.NSTextField('alloc')('init');
	this.nswindow('contentView')(
		'addSubview', field
	);
	field('setFrame', $.NSMakeRect(x, y, width, height));

	field('setStringValue', $(text));
	field('setBezeled', $.NO);
	field('setDrawsBackground', $.NO);
	field('setEditable', $.NO);
	field('setSelectable', $.NO);

	fielddata.nstextfield = field;
	
	this.children.push(fielddata);
	return fielddata.functions;
}
