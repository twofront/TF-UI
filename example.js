#!/usr/local/bin/node

var tfui = require('./');

setInterval(function() {
	console.log('a');
}, 1000);

tfui.menuBar
	.addMenu('File')
		.addItem('AddMenu', 'e', function() {
			tfui.menuBar
				.addMenu('MenuAdded');
		})
		.addItem('World', 'w');

tfui.menuBar
	.addMenu('Edit')
		.addItem('Yay')
		.addItem('More')
		.addItem('Stuff');

tfui.menuBar
	.addMenu('Help')
		.addItem('Docs');

tfui.statusBar
	.addItem('TFUI');

tfui
	.addWindow('Test Window')
		.setSize(800, 800);

tfui.run();
