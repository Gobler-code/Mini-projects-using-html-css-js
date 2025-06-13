const inputBox = document.getElementById('input');
const expressionDiv =  document.getElementById('expression');
const resultDiv = document.getElementById('result');

let expression = '';
let result = '';

//define even handler

function buttonClick(event){
    //get values form clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    
   //switch case function to control the calculator

switch(action){
    case 'number':
       addvalue(value);
        break;
    case 'clear' :
       clear();
        break;
    case 'backspace' :
        backspace ();
        break;
    case 'addition':
    case 'subtraction':
    case 'multiplication':
    case 'division':
        if(expression === '' && result !== ''){
            startFromResult(value);
        }
        else if (expression !== '' && !isLastCharOperator()){
            addvalue(value);
        }
        break;
    case 'submit':
        submit();
        break;
     case 'negate':
        negate();
        break;
    case 'mod':
        percentage();
        break;
    case 'decimal':
        decimal(value);
        break;
    
            // Existing cases...
    case 'sqrt':
        squareRoot();
        break;
    case 'square':
        square();
        break;
    case 'cube':
        cube();
        break;
    case 'integrate':
        integrate();
        break;
    case 'derivative':
        derivative();
        break;
        }


  updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);

function addvalue(value){
  if(value === '.'){
    const lastOperatorIndex = expression.search(/[+\-*/]/);
    const lastDecimalIndex = expression.lastIndexOf('.');
    const lastnumberIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/')
    );
  

  if (
    (lastDecimalIndex < lastOperatorIndex ||
     lastDecimalIndex <lastnumberIndex ||
      lastDecimalIndex === -1)
&& (expression === '' || 
    expression.slice(lastnumberIndex +1).indexOf('-')=== -1)
) {
    expression += value;
}
} 
else{
    expression += value;
}
  
  
}

function  updateDisplay(expression , result){
       expressionDiv.textContent = expression;
       resultDiv.textContent = result;
}

function clear(){
    expression = '';
    result = '';
}

function backspace(){
    expression = expression.slice(0,-1);
}

function isLastCharOperator(){
    return isNaN(parseInt(expression.slice(-1)));
}
function startFromResult(value)
{
    expression += result;
}

function submit(){
    result = evaluateExpression();
    expression = '';
}

function evaluateExpression(){
    const evalResult = eval(expression);
    return isNaN(evalResult) || !isFinite(evalResult)
    ? ' '
    : evalResult < 1
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}
function negate(){
   if(expression === '' && result !== ''){
    result = -result;
   } 
   else if(!expression.startsWith('-') && expression !== ''){
    expression = '-' +expression;
   }
   else if(expression.startsWith('-')){
    expression = expression.slice(1);
   }
}
function percentage(){
    if(expression !== ''){
        result = evaluateExpression();
        expression = '';
    
    if(!isNaN(result) && isFinite(result)){
        result /= 100;
    }
    else{
        result = '';
    }
}
else if(result !== ''){
    result = parseFloat(result) / 100;
}
}
function decimal(value){
   if(!expression.endsWith('.') && !isNaN(expression.slice(-1))){
    addvalue(value);
   }
}
function squareRoot() {
    if (expression !== '') {
        result = Math.sqrt(evaluateExpression(expression));
        expression = '';
    } else if (result !== '') {
        result = Math.sqrt(result);
    }
}
function square() {
    if (expression !== '') {
        const num = evaluateExpression(expression);
        result = num * num;
        expression = '';
    } else if (result !== '') {
        result = result * result;
    }
}
function cube() {
    if (expression !== '') {
        const num = evaluateExpression(expression);
        result = num * num * num;
        expression = '';
    } else if (result !== '') {
        result = result * result * result;
    }
}
function integrate() {
    if (expression !== '') {
        try {
            const expr = math.parse(expression);
            const integrated = math.integrate(expr, 'x').toString();
            result = integrated;
            expression = '';
        } catch (error) {
            result = 'Error';
        }
    }
}

function derivative() {
    if (expression !== '') {
        try {
            const expr = math.parse(expression);
            const derivative = math.derivative(expr, 'x').toString();
            result = derivative;
            expression = '';
        } catch (error) {
            result = 'Error';
        }
    }
}



