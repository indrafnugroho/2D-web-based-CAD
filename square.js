var setSquare = function() {
    isLine = false
    isSquare = true
    isPolygon = false
}

var drawSquare = function(x, y) {
    var s = 0.2 // value between 0 and 2
    var x2 = x + s
    var y2 = y - s
    
    vertices = [
        x, y, rgb[0]/255, rgb[1]/255, rgb[2]/255,
        x2, y, rgb[0]/255, rgb[1]/255, rgb[2]/255,
        x2, y2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
        x, y2, rgb[0]/255, rgb[1]/255, rgb[2]/255
    ]
    
    // console.log(vertices)
    renderAll()
    renderObject(vertices, 4, gl.TRIANGLE_FAN)

    console.log("masuk sini")
    arrObjects.push({
        vert: vertices,
        meth: gl.TRIANGLE_FAN,
        n: 4,
        p: points
    })
    vertices = []
    isSquare = false
    points = []
}

var points = []

var getSquarePoint = function(x, y) {
    return [
        x-0.025, y+0.025, 1.0, 1.0, 1.0,
        x+0.025, y+0.025, 1.0, 1.0, 1.0,
        x+0.025, y-0.025, 1.0, 1.0, 1.0,
        x-0.025, y-0.025, 1.0, 1.0, 1.0
    ]
}