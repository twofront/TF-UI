#!/usr/local/bin/node

var tfui = require('../');

var win = tfui
	.addWindow()
		.setTitle('OpenGL Example')
		.setSize(800, 800);

var gl = win.addGL();

setInterval(function() {
	gl.draw();
}, 1000);

tfui.run(function() {});
