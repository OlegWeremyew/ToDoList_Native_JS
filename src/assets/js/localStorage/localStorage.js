function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function cleanListLocal() {
    localStorage.setItem("todos", JSON.stringify([]));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {

        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;

        CreateTodoItemInList(todoDiv, newTodo);
        createCompletedButton(todoDiv);
        createTrashButton(todoDiv);

        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}