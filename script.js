let tasks = [] //empty array to store tasks
let completedTasks = []; // second array

document.getElementById('addTaskBtn').addEventListener('click', function () {
    //get the value from input field
    let taskInput = document.getElementById('taskInput').value;
    //check if input is empty
    if(taskInput) {
        //add new tasks to task array
        tasks.push(taskInput)
        //clear input field value
        document.getElementById('taskInput').value = '';
        //update task list display
        displayTasks()
    };
});

function displayTasks() {
    //select task list in the HTMl
    let taskList = document.getElementById('taskList');
    //clear the existing HTML list
    taskList.innerHTML = '';
    //loop through each task in the array and create a list item for each
    tasks.forEach((task, index) => {
        //create <li> element for each task
        let li = document.createElement('li');
        //add styling
        li.classList.add(
            'list-group-item',
            'd-flex',
            'justify-content-center',
            'align-items-center'
        )
        //set the inner HTML of the LI with a task and remove button
        li.innerHTML = `${task} <button class= 'btn btn-success btn-sm ms-5 m-2' id='enter' onclick='toggleComplete(this)'> ✓ </button>` 
        //append the new task list to the HTML
        taskList.appendChild(li)
    });
};

function removeTask(index) {
    tasks.splice(index,1)
    completedTasks.splice(index, 1)
    displayTasks()
}

document.getElementById('clearTasksBtn').addEventListener('click', function () {
    tasks = []
    completedTasks = [];
    displayTasks()
});

document.getElementById("taskInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            document.getElementById('addTaskBtn').click()
        }
    });

function updateCounter() {
    let total = tasks.length;
    let completed = completedTasks.filter(task => task).length;
    let task = total - completed;

    document.getElementById('taskCounter').textContent =
        `${task} task | ${completed} completed`;
};

function toggleComplete(index) {
    completedTasks[index] = !completedTasks[index];
    displayTasks();
}