var setLine = function() {
    isLine = true
    isSquare = false
    isPolygon = false
}

var drawLine = function(x, y) {
    if (n_after < 2) {
        vertices.push(x)
        vertices.push(y)
        vertices.push(rgb[0]/255)
        vertices.push(rgb[1]/255)
        vertices.push(rgb[2]/255)
        n_after++
        // console.log(vertices)
        renderAll()
        main(vertices, n_after, gl.LINES)
    }

    if (n_after == 2) {
        console.log("masuk sini")
        arrObjects.push({
            vert: vertices,
            meth: gl.LINES,
            n: n_after
        })
        vertices = []
        n_after = 0
        isLine = false
    }
}