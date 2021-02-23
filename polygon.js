var n_poly = 1
var nPolyPushed = 0

var changeNPoly = function() {
    n_poly = document.getElementById("n-poly").value
    // console.log(n_poly)
}

var setPolygon = function() {
    isLine = false
    isSquare = false
    isPolygon = true
}

var drawPolygon = function(x, y) {
    if (nPolyPushed < n_poly) {
        vertices.push(x)
        vertices.push(y)
        vertices.push(rgb[0]/255)
        vertices.push(rgb[1]/255)
        vertices.push(rgb[2]/255)
        nPolyPushed++
        // console.log(vertices)
        main(vertices, nPolyPushed, gl.TRIANGLE_FAN)
    }

    if (nPolyPushed === n_poly) {
        arrObjects.push({
            vert: vertices,
            meth: gl.TRIANGLE_FAN,
            n: nPolyPushed
        })
        vertices = []
    }
}

