#!/usr/local/bin/node

var tfui = require('./');

function buttonAction() {
	win
		.setTitle('New Title')
		.setSize(1000, 1000);
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

win.addButton('Test Button', 100, 100, 200, 30)
	.onClick(buttonAction.bind(1));

win.addButton('Test Button 2', 200, 200, 100, 30)
	.onClick(buttonAction.bind(2));

tfui.run();
