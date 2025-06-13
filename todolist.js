let todo = JSON.parse(localStorage.getItem("todo"))|| [];
const todoInput = document.getElementById("todoInput")
const todoList = document.getElementById("todolist");
const todoCount = document.getElementById("todoCount")
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

//initialize

document.addEventListener("DOMContentLoaded", function(){

    addButton.addEventListener("click",addtask);
    todoInput.addEventListener("keydown", function (event){
        if(event.key === "Enter"){
            event.preventDefault();
            addtask();
        }
    })
   deleteButton.addEventListener("click",deletetask);
   displayTasks();
})

function addtask(){
   const newTask = todoInput.value.trim();//remove extra space from start to end

   if(newTask !== ""){
    todo.push({
        text : newTask , 
        disabled:false,
    });
   savetolocalstorage();
   todoInput.value="";
   displayTasks();
   }
}

function deletetask(){
todo = [];
savetolocalstorage();
displayTasks();
} 

function displayTasks(){
 todoList.innerHTML= "";
 todo.forEach((element,index) => {
    const p = document.createElement("P");
    p.innerHTML= `
    <div class="todo-container">
    <input type="checkbox" class="todo-checkbox"
    id="input-${index}" ${element.disabled?"checked":""}>

    <p id="todo-${index}" class="${element.disabled ? 
        "disabled" : ""}" onclick = "editTask(${index})">${element.text}
    
    </p>
    </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change",()=>{
        toggleTask(index)
 });
    todoList.appendChild(p);
 });
  todoCount.textContent= todo.length;
}

function toggleTask(index){
    todo[index].disabled = !todo[index].disabled;
    savetolocalstorage();
    displayTasks();
}
function editTask(index){
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
    inputElement.addEventListener("blur",function(){
        const updatedText = inputElement.value .trim();
        if(updatedText){
            todo[index].text = updatedText;
            savetolocalstorage();
        }
        displayTasks();
    })
}
function savetolocalstorage(){
    localStorage.setItem("todo",JSON.stringify(todo))
}