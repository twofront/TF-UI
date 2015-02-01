
var $ = require('NodObjC');
var fs = require('fs');

var ref = require('ref');
var ArrayType = require('ref-array');
var IntArray = ArrayType(ref.types.int);

var context = null;
var firstGL = true;

var drawableVerts = null;
var drawableBuffer = null;

var bufferedVerts;
var Colors;
module.exports.addGL = function() {
	fs.readFile('object.obj', 'utf8', function(err, data) {
		var vertices = [];
		drawableVerts = [];

		// Read our object data
		var lines = data.split('\n');
		for (var i=0; i<lines.length; i++) {
			var line = lines[i];
			var parts = line.split(' ');
			if (parts[0] === 'v' && parts.length >= 4) {
				var coords = {
					x: Number(parts[1]),
					y: Number(parts[2]),
					z: Number(parts[3])
				};
				vertices.push(coords);
			} else if (parts[0] === 'f' && parts.length >= 4) {
				for (var j=1; j<4; j++) {
					var vertNumber = Number(parts[j].split('/')[0])-1;
					drawableVerts.push(vertices[vertNumber]);
				}
			}
		}

		// Buffer our object data
		var vertexBuffer = ref.alloc('uint');
		$.glGenBuffers(1, vertexBuffer);
		drawableBuffer = vertexBuffer.deref();
		$.glBindBuffer($.GL_ARRAY_BUFFER, drawableBuffer);

		var s = 0.01;
		bufferedVerts = new Buffer(drawableVerts.length*12);
		Colors = new Buffer(drawableVerts.length*12);
		for (var i=0; i<drawableVerts.length; i++) {
			bufferedVerts.writeFloatLE(drawableVerts[i].x*s, i*12);
			bufferedVerts.writeFloatLE(drawableVerts[i].y*s, (i*12)+4);
			bufferedVerts.writeFloatLE(drawableVerts[i].z*s, (i*12)+8);

			Colors.writeFloatLE(1.0, i*12);
			Colors.writeFloatLE(0.0, (i*12)+4);
			Colors.writeFloatLE(0.7, (i*12)+8);
		}

		$.glBufferData($.GL_ARRAY_BUFFER, drawableVerts.length*12, bufferedVerts, $.GL_STATIC_DRAW);
	});

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
	var s = 0.01;

	/*$.glBegin($.GL_TRIANGLES);

	$.glColor3f(0, 0, 1);

	if (drawableVerts !== null) {
		for (var i=0; i<drawableVerts.length; i++) {
			var v = drawableVerts[i];
			$.glColor3f(v.x*s*2,  v.y*s*2, v.z*s*2);
			$.glVertex3f(v.x*s,  v.y*s, v.z*s);
		}
	}*/

	if (drawableBuffer !== null) {
		$.glBindBuffer($.GL_ARRAY_BUFFER, drawableBuffer);
		$.glEnableVertexAttribArray(0);
		$.glVertexAttribPointer(0, 3, $.GL_FLOAT, $.GL_FALSE, 0, bufferedVerts);
		//$.glDrawElements($.GL_TRIANGLES, drawableVerts.length, $.GL_UNSIGNED_BYTE, ref.alloc('void'));
		$.glColor3f(1, 0, 1);
		//$.glColorPointer(3, $.GL_INT, 0, Colors)
		$.glDrawArrays($.GL_TRIANGLES, 0, drawableVerts.length/3);
	}

	/*$.glColor3f(0, 0, 1);
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
	$.glVertex3f( 1*s, -1*s, -1*s); //F B R*/

	//$.glEnd();
}

function draw() {
	context('makeCurrentContext');

	//$.glClearColor(Math.random(), Math.random(), Math.random(), 1);
	$.glClearColor(0, .7, 1.0, 1);
    $.glClear($.GL_COLOR_BUFFER_BIT);
    if (Math.random() > 0.1) addCube();
	$.glFlush();
}
