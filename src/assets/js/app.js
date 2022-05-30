//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearListButton = document.querySelector(".clear-list-btn");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);
clearListButton.addEventListener("click", clearList)

//Functions
function addTodo(e) {
    //Prevent natural behaviour
    e.preventDefault();

    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create list
    const newToDo = document.createElement("li");
    newToDo.innerText = todoInput.value;

    //Save to local
    saveLocalTodos(todoInput.value);

    CreateTodoItemInList(todoDiv, newToDo);
    createCompletedButton(todoDiv);
    createTrashButton(todoDiv);

    //attach final Todo
    todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {

        // e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");

        //at the end
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function clearList() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
    cleanListLocal();
}
