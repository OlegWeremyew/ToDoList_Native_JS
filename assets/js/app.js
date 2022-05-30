//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearListButton = document.querySelector(".clear-list-btn");
const readonlyModeCheckbox = document.querySelector(".readonly-mode-input");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
document.addEventListener("DOMContentLoaded", getFilterTodoValue);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);
clearListButton.addEventListener("click", clearList)
readonlyModeCheckbox.addEventListener('click', changeMode);

//ReadonlyMode
const readonlyMode = getReadonlyMode();
readonlyModeCheckbox.checked = readonlyMode
readOnlyChangeMode(readonlyModeCheckbox.checked);

//Function
function changeMode() {
    setReadonlyMode(readonlyModeCheckbox.checked);
    readOnlyChangeMode(readonlyModeCheckbox.checked);
}

function addTodo(e) {
    //Prevent natural behaviour
    e.preventDefault();

    if (todoInput.value.trim()) {

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
                //Save to local
                setFilterTodoValue("all")
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    //Save to local
                    setFilterTodoValue("completed")
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    //Save to local
                    setFilterTodoValue("uncompleted")
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
    //Save to local
    cleanListLocal();
}
