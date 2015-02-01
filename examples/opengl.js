#!/usr/local/bin/node

var tfui = require('../');

var win = tfui
	.addWindow()
		.setTitle('OpenGL Example')
		.setSize(800, 800);

var gl = win.addGL();

var last = 0.0;
var count = 0;
//setInterval(function() {
function drawIt() {
	var t = (new Date()).getTime();
	if (count%3 === 0) {
		var dif = t-last;
		console.log(1000/dif+' FPS');
	}
	last = t;
	gl.draw();
	count++;
	setImmediate(drawIt);
}
setTimeout(drawIt, 500);
//}, 165);

tfui.run(function() {});
