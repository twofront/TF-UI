
var $ = require('NodObjC');

var ref = require('ref');
var ArrayType = require('ref-array');
var IntArray = ArrayType(ref.types.int);

var context = null;
var firstGL = true;

module.exports.addGL = function() {
	if (firstGL) {
		$.import('OpenGL');
		firstGL = false;
	}

	var attributes = new Buffer(56);
	attributes.writeInt32LE(0, 0);
	attributes.writeInt32LE(0, 4);
	attributes.writeInt32LE(0, 8);
	attributes.writeInt32LE(0, 12);
	attributes.writeInt32LE(0, 16);
	attributes.writeInt32LE(0, 20);
	attributes.writeInt32LE(0, 24);
	attributes.writeInt32LE(0, 28);
	attributes.writeInt32LE(0, 32);
	attributes.writeInt32LE(0, 36);
	attributes.writeInt32LE(0, 40);
	attributes.writeInt32LE(0, 44);
	attributes.writeInt32LE(0, 48);
	attributes.writeInt32LE(0, 52);

	var pixelFormat = $.NSOpenGLPixelFormat('alloc')(
		'initWithAttributes', attributes
	);

	context = $.NSOpenGLContext('alloc')('initWithFormat', pixelFormat, 'shareContext', null);
	context('setView', this.nswindow('contentView'));

	return {
		'draw': draw
	};
}

function addCube() {
	var s = 0.25;

	$.glBegin($.GL_QUADS);

	$.glColor3f(0, 0, 1);
	$.glVertex3f(-1*s,  1*s, -1*s); //F T L
	$.glColor3f(1, .75, 0);
	$.glVertex3f( 1*s,  1*s, -1*s); //F T R
	$.glColor3f(0, 1, 0);
	$.glVertex3f( 1*s, -1*s, -1*s); //F B R
	$.glColor3f(1, 0, 0);
	$.glVertex3f(-1*s, -1*s, -1*s); //F B L

	$.glColor3f(1, 0, 0);
	$.glVertex3f(-1*s, -1*s, -1*s); //F B L
	$.glColor3f(0, 1, 0);
	$.glVertex3f( 1*s, -1*s, -1*s); //F B R
	$.glColor3f(0, .5, 0);
	$.glVertex3f( 1*s, -1*s,  1*s); //B B R
	$.glColor3f(.5, 0, 0);
	$.glVertex3f(-1*s, -1*s,  1*s); //B B L

	$.glColor3f(0, 0, .5);
	$.glVertex3f(-1*s,  1*s,  1*s); //B T L
	$.glColor3f(0, 1, 1);
	$.glVertex3f( 1*s,  1*s,  1*s); //B T R
	$.glColor3f(0, .5, 0);
	$.glVertex3f( 1*s, -1*s,  1*s); //B B R
	$.glColor3f(.5, 0, 0);
	$.glVertex3f(-1*s, -1*s,  1*s); //B B L

	$.glColor3f(0, 0, .5);
	$.glVertex3f(-1*s,  1*s,  1*s); //B T L
	$.glColor3f(0, 0, 1);
	$.glVertex3f(-1*s,  1*s, -1*s); //F T L
	$.glColor3f(1, 0, 0);
	$.glVertex3f(-1*s, -1*s, -1*s); //F B L
	$.glColor3f(.5, 0, 0);
	$.glVertex3f(-1*s, -1*s,  1*s); //B B L

	$.glColor3f(0, 0, .5);
	$.glVertex3f(-1*s,  1*s,  1*s); //B T L
	$.glColor3f(0, 1, 1);
	$.glVertex3f( 1*s,  1*s,  1*s); //B T R
	$.glColor3f(1, .75, 0);
	$.glVertex3f( 1*s,  1*s, -1*s); //F T R
	$.glColor3f(0, 0, 1);
	$.glVertex3f(-1*s,  1*s, -1*s); //F T L

	$.glColor3f(1, .75, 0);
	$.glVertex3f( 1*s,  1*s, -1*s); //F T R
	$.glColor3f(0, 1, 1);
	$.glVertex3f( 1*s,  1*s,  1*s); //B T R
	$.glColor3f(0, .5, 0);
	$.glVertex3f( 1*s, -1*s,  1*s); //B B R
	$.glColor3f(0, 1, 0);
	$.glVertex3f( 1*s, -1*s, -1*s); //F B R

	$.glEnd();
}

function draw() {
	context('makeCurrentContext');
	$.glClearColor(Math.random(), Math.random(), Math.random(), 1);
    $.glClear($.GL_COLOR_BUFFER_BIT);
    if (Math.random() > 0.5) addCube();
	$.glFlush();
}
