var currentInput = 1

function loadRange(){
	console.log(currentInput)
	if(currentInput == 1){
		lineClick();
	}
	if(currentInput == 2){
		squareClick();
	}
}

function lineClick(){
	currentInput = 1;
	document.getElementById('line').style.width ='40px';
	document.getElementById('square').style.width = '30px';
	var x = document.getElementById('range').value/100;
	loadLine(x);
}

function squareClick(){
	currentInput = 2;
	document.getElementById('line').style.width ='30px';
	document.getElementById('square').style.width = '40px';
	var x = document.getElementById('range').value/100;
	loadSquare(x);
}