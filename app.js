var vertexShaderText = 
    `precision mediump float;

    attribute vec2 vertPosition;
    attribute vec3 vertColor;
    varying vec3 fragColor;

    void main() {
        fragColor = vertColor;
        gl_Position = vec4(vertPosition, 0.0, 1.0);
    }`

var fragmentShaderText = 
    `precision mediump float;
    
    varying vec3 fragColor;
    void main() {
        gl_FragColor = vec4(fragColor, 1.0);
    }`

var createShader = function(type, source) {
    var shader = gl.createShader(type)

    gl.shaderSource(shader, source)

    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader!', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return
    }

    return shader
}

var createProgram = function(vertexShader, fragmentShader) {
    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program!', gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return
    }
    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('Error validating program!', gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return
    }

    return program
}

var drawObject = function (program, vertices, method, n) {
    var vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		2, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation)
	gl.enableVertexAttribArray(colorAttribLocation)

	// Main render loop
	gl.useProgram(program)
    gl.drawArrays(method, 0, n)
}

var canvas = document.getElementById('canvas-surface')
var gl = canvas.getContext('webgl')

var load = function() {
    if (!gl) {
        console.log('webgl not supported')
        gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

    // gl.clearColor(0.75, 0.85, 0.8, 1.0)
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

var main = function (vertices, n, method) {
    console.log('This is working')
    // gl.clearColor(0.75, 0.85, 0.8, 1.0)
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Create Shaders
    var vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderText)
    var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderText)

    // Create program
    var program = createProgram(vertexShader, fragmentShader)

    drawObject(program, vertices, method, n)
}

var isPolygon = false
var isLine = false
var isSquare = false

var x = 0
var y = 0
var width = document.getElementById('canvas-surface').width
var height = document.getElementById('canvas-surface').height

canvas.addEventListener('mousedown', function(e) {
    x = getXCursorPosition(canvas, e)
    y = getYCursorPosition(canvas, e)   
    console.log('x : '+ x + ' y : ' + y)
    render(x, y)
})

var render = function(x, y) {
    if (isPolygon) {
        drawPolygon(x, y)
    } else if (isLine) {
       drawLine(x, y)
    } else if (isSquare) {
        drawSquare(x, y)
    }
}

var renderAll = function() {
    for (var i=0; i<arrObjects.length; i++) {
        main(arrObjects[i].vert, arrObjects[i].n, arrObjects[i].meth)
    }
}

var getXCursorPosition = function(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    return (x - width/2)/ (width/2);
}

var getYCursorPosition  = function(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    return (y - height/2)/ (height/2) * -1;
}

var vertices = []
var rgb = [0.0, 0.0, 0.0]

var arrObjects = []

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

var getColor = function() {
    var hex = document.getElementById("color_picker").value
    rgb = hexToRgb(hex)
    // console.log("color " + rgb[0])
}