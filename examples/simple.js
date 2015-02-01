#!/usr/local/bin/node

var tfui = require('../');

function chooseFile() {
	console.log(tfui.chooseFile());
}
function changeTitle() {
	win.setTitle('Title Changed')
}
function maximize() {
	win.maximize(true);
}
function minimize() {
	win.maximize(false);
}

tfui.menuBar
	.addMenu('File')
		.addItem('Choose File', 'e', chooseFile);

tfui.menuBar
	.addMenu('Edit')
		.addItem('Copy')
		.addItem('Cut')
		.addItem('Paste');

tfui.menuBar
	.addMenu('Help');

tfui.statusBar
	.addItem('TFUI')
		.addMenu('TFUI');

var win = tfui
	.addWindow()
		.setTitle('Test Window')
		.setSize(800, 800);

win.addButton('Maximize', 0, 0, 100, 25)
	.onClick(maximize);

win.addButton('Minimize', 0, 25, 100, 25)
	.onClick(minimize);

win.addButton('Change Title', 0, 50, 100, 25)
	.onClick(changeTitle);

win.addButton('Choose File', 0, 75, 100, 25)
	.onClick(chooseFile);

var textfield = win.addTextField(150, 5, 100, 20)
	.onReturn(function() {
		console.log('Pressed return in text field!');
		console.log(textfield.getValue());
	});

win.addLabel('Hello World', 150, 30, 100, 20);

tfui.run(function() {
	console.log('Started');
});
// Code after our call to tfui.run will never execute.
