var currentInput = 1
var width = document.getElementById('my_Canvas').width;
var height = document.getElementById('my_Canvas').height;
var x = 0;
var y = 0;

const canvas = document.getElementById('my_Canvas');
canvas.addEventListener('mousedown', function(e) {
   x = getXCursorPosition(canvas, e)
   y = getYCursorPosition(canvas, e)   
   console.log('x : '+ x + ' y : ' + y)
   loadRange()
})

function getXCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    return (x - width/2)/ (width/2);
}

function getYCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    return (y - height/2)/ (height/2) * -1;
}

function loadRange(){
	console.log(currentInput)
	if(currentInput == 1){
		lineClick(x, y);
	}
	if(currentInput == 2){
		squareClick(x, y);
	}
}

function lineClick(x, y){
	currentInput = 1;
	document.getElementById('line').style.width ='40px';
	document.getElementById('square').style.width = '30px';
	var r = document.getElementById('range').value/100;
	loadLine(x,y,r);
}

function squareClick(x, y){
	currentInput = 2;
	document.getElementById('line').style.width ='30px';
	document.getElementById('square').style.width = '40px';
	var r = document.getElementById('range').value/100;
	loadSquare(x,y,r);
}