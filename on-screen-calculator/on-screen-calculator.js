
var num1 = "";
var operation = "";
var output = "";
var currentNumber = "";

var add = function(num1, num2) {
	return num1 + num2;
};

var subtract = function(num1, num2) {
	return num1 - num2;
};

var multiply = function(num1, num2) {
	return num1 * num2;
};

var divide = function(num1, num2) {
	if (num2 !== 0 ) {
		return num1 / num2;
	} else {
		return "Infinity";
	}
};

var calculate = function(num1, num2, operation) {	
	switch (operation) {
		case "+":
			output = add(num1,num2);
			break;
		case "-":
			output = subtract(num1,num2);
			break;
		case "/":
			output = divide(num1,num2);
			break;
		case "*":
			output = multiply(num1,num2);
			break;
		default: 
			alert("check expression correctness");
	}
	document.getElementById('output').value = output;
}

var processClick = function(id) {		
	switch (id) {
		case "0":
			if (output !== "0") {
				output += id;
				document.getElementById('output').value = output;				
			} else {
				output = "";
			}
			break;	
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":					
			output += id;
			currentNumber += id;
			document.getElementById('output').value = output;
			break;
		case "+":
		case "-":
		case "/":
		case "*":
			num1 = output;
			currentNumber = "";
			output += id;
			document.getElementById('output').value = output;
			operation = id;
			break;
		case "C":
			num1 = "";
			currentNumber = "";
			operation = "";
			output = "";
			document.getElementById('output').value = output;
			break;
		case "=":			
			calculate(Number(num1),Number(currentNumber),operation);
			break;
		default :
			alert("wrong operation");
			break;
		}	
};