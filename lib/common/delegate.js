var $ = require('NodObjC');

var methodCounter = 0;

exports.appDelegate = null;

exports.create = function(delegateType, delegateParent) {
	var delegate = $.NSObject.extend(delegateType);
	delegate.register();
	delegateParent('setDelegate', delegate('alloc')('init'));

	var delegatedata = {
		addMethod: addMethod.bind(delegate),
		delegate: delegate
	};

	if (delegateType === 'AppDelegate') exports.appDelegate = delegatedata;
	return delegatedata;
}

function addMethod() {
	var methodname = null;
	var callback = null;
	if (arguments.length < 2) {
		if (typeof(arguments[0]) === 'function') {
			callback = arguments[0];
			methodname = 'method'+methodCounter+':';
		} else {
			methodname = arguments[0];
		}
		methodCounter++;
	} else {
		methodname = arguments[0];
		callback = arguments[1];
	}
	if (callback) this.addMethod(methodname, 'v@:@', callback);
	return methodname;
}
