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
    main(vertices, 4, gl.TRIANGLE_FAN)

    console.log("masuk sini")
    arrObjects.push({
        vert: vertices,
        meth: gl.TRIANGLE_FAN,
        n: 4
    })
    vertices = []
    isSquare = false
}