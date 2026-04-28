let tasks = [] //empty array to store tasks
// array to track whether task is completed or not, initialized with false for each task
let completedTasks = []; 

// add event listener to the add task button
document.getElementById('addTaskBtn').addEventListener('click', function () {
    //get the value from input field
    let taskInput = document.getElementById('taskInput').value;
    //check if input is empty
    if(taskInput) {
        //add new tasks to task array
        tasks.push(taskInput)
        completedTasks.push(false); // add false to completedTasks array for each new task
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
        );

        // check if the task is completed and add 'completed' class if true
        if (completedTasks[index]) {
        li.classList.add('completed')
    };
        //set the inner HTML of the LI with a task and remove button
        li.innerHTML = `${task} <button class= 'enter btn btn-sm ms-5 m-2' onclick='toggleComplete(${index})'> ✓ </button>` 
        //append the new task list to the HTML
        taskList.appendChild(li)
    });
    // update task counter after displaying tasks
    updateCounter();
};

// function to remove a task from the list
function removeTask(index) {
    // remove the task at the specified index from both tasks and completedTasks arrays
    tasks.splice(index,1)
    // remove the corresponding completion status
    completedTasks.splice(index, 1)
    displayTasks()
}

// event listener for clear tasks button to clear all tasks and reset the arrays
document.getElementById('clearTasksBtn').addEventListener('click', function () {
    // clear both tasks and completedTasks arrays
    tasks = []
    completedTasks = [];
    displayTasks()
});

// event listener for the input field to allow adding tasks by pressing Enter key
document.getElementById("taskInput").addEventListener("keypress", function (event) {
    // check if the pressed key is Enter
        if (event.key === "Enter") {
            document.getElementById('addTaskBtn').click()
        }
    });

    // function to update the task counter display
function updateCounter() {
    // calculate total, completed, and remaining tasks
    let total = tasks.length;
    // count the number of completed tasks by filtering the completedTasks array
    let completed = completedTasks.filter(task => task).length;
    // calculate remaining tasks by subtracting completed from total
    let remaining = total - completed;
    
    // update the task counter text content with the remaining and completed tasks
    document.getElementById('taskCounter').textContent =

    // ternary operator to handle singular and plural forms of 'task' based on the remaining count
    // if the remaining tasks is not 1, it will display 'tasks' instead of 'task'
        `${remaining} task${remaining !== 1 ? 's' : ''} | ${completed} completed`;
};

// function to toggle the completion status of a task
function toggleComplete(index) {
    // toggle the completion status of the task at the specified index
    completedTasks[index] = !completedTasks[index];
    displayTasks();
}