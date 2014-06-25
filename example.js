#!/usr/local/bin/node

var tfui = require('./');

function buttonAction() {
	win.setTitle('New Title')

	if (this == 1) win.maximize(true);
	else win.maximize(false);

	console.log('Button '+this+' Pressed');
}

function menuAction() {
	tfui.menuBar
		.addMenu('MenuAdded');
	console.log('Menu Item '+this+' Pressed');
}

tfui.menuBar
	.addMenu('File')
		.addItem('AddMenu', 'e', menuAction.bind(1));

tfui.menuBar
	.addMenu('Edit')
		.addItem('Copy')
		.addItem('Cut')
		.addItem('Paste');

tfui.menuBar
	.addMenu('Help');

tfui.statusBar
	.addItem('TFUI');

var win = tfui
	.addWindow()
		.setTitle('Test Window')
		.setSize(800, 800);

win.addButton('Button 1', 0, 25, 100, 25)
	.onClick(buttonAction.bind(1));

win.addButton('Button 2', 0, 0, 100, 25)
	.onClick(buttonAction.bind(2));

tfui.run(function() {
	console.log('Started');
});
// Code after our call to tfui.run will never execute.
