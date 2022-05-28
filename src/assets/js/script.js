const addTaskBtn = document.getElementById('add-task-btn');
const descriptionTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasksElements;
!localStorage.tasksElements ? tasksElements = [] : tasksElements = JSON.parse(localStorage.getItem('tasksElements'));

let toDoItemElements = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, taskIndex) => {
    return `
         <div class="todo-item ${tasksElements.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${taskIndex})" class="btn-complete" type="checkbox" ${tasksElements.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${taskIndex})" class="btn-delete" type="button">Delete</button>
            </div>
        </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasksElements.length && tasksElements.filter(item => item.completed === false);
    const completedTasks = tasksElements.length && tasksElements.filter(item => item.completed === true);
    tasksElements = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasksElements.length) {
        filterTasks();
        tasksElements.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        toDoItemElements = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const updateLocalStorage = () => {
    localStorage.setItem('tasksElements', JSON.stringify(tasksElements));
}

const completeTask = (taskIndex) => {
    tasksElements[taskIndex].completed = !tasksElements[taskIndex].completed;
    if (tasksElements[taskIndex].completed) {
        toDoItemElements[taskIndex].classList.add('checked');
    } else {
        toDoItemElements[taskIndex].classList.remove('checked');
    }
    updateLocalStorage();
    fillHtmlList();
}

const deleteTask = (taskIndex) => {
    toDoItemElements[taskIndex].classList.add('deletion');
    setTimeout(() => {
        tasksElements.splice(taskIndex, 1);
        updateLocalStorage();
        fillHtmlList();
    }, 500);
}

addTaskBtn.addEventListener('click', () => {
    tasksElements.push(new Task(descriptionTaskInput.value));
    updateLocalStorage();
    fillHtmlList();
    descriptionTaskInput.value = '';
})