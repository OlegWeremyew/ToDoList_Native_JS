//Features
function createCompletedButton(todoDiv) {
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
}

function createTrashButton(todoDiv) {
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
}

function CreateTodoItemInList(todoDiv, newTodo) {
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
}

function readOnlyChangeMode(modeValue) {
    if (modeValue) {
        todoInput.setAttribute("disabled", "disabled");
        todoButton.setAttribute("disabled", "disabled");
        clearListButton.setAttribute("disabled", "disabled");
        filterOption.setAttribute("disabled", "disabled");
    } else {
        todoInput.removeAttribute("disabled");
        todoButton.removeAttribute("disabled");
        clearListButton.removeAttribute("disabled");
        filterOption.removeAttribute("disabled");
    }
}