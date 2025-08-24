const button = document.getElementById('todosubmit');
const container = document.getElementById('todocontainer');
const input = document.getElementById('todoinput');

const taskArray = [];

initializeTodolist();

function addTaskToArray() {
    const input = document.getElementById('todoinput').value;

    if(input) {
        taskArray.push(input);
        console.log(taskArray);
        
        initializeTodolist();
        document.getElementById('todoinput').value = '';
    }
}

function moveArrayItem(i, up) {
    if (up && i > 0){
        [taskArray[i - 1], taskArray[i]] = [taskArray[i], taskArray[i - 1]]
    }
    else if (!up && i < taskArray.length - 1) {
        [taskArray[i + 1], taskArray[i]] = [taskArray[i], taskArray[i + 1]]
    }

    initializeTodolist();
}

function deleteArrayItem(i) {

    taskArray.splice(i, 1)

    initializeTodolist();
}

function initializeTodolist() {

    container.innerHTML = "";

    for (let i = 0; i < taskArray.length; i++) {
        container.innerHTML +=
        `
        <div class="todoitem">
            <h2>${i + 1}. ${taskArray[i]}</h2>
            <div>

                <button onclick="moveArrayItem(${i}, true)">
                    Move Up
                </button>

                <button onclick="moveArrayItem(${i}, false)">
                    Move Down
                </button>

                <button onclick="deleteArrayItem(${i})">
                    Delete
                </button>
            </div>
        </div>
        `
    }
}