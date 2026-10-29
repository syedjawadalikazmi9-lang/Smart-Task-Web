let tasks = JSON.parse(localStorage.getItem('web_tasks')) || [];
let editIndex = null;

// Display tasks on load
window.onload = function() {
    displayTasks(tasks);
};

function addOrUpdateTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    if (editIndex !== null) {
        // Update
        tasks[editIndex].text = taskText;
        editIndex = null;
        document.getElementById('addBtn').innerText = "Add Task";
    } else {
        // Create
        tasks.push({ id: Date.now(), text: taskText });
    }

    saveAndRefresh();
    input.value = "";
}

function displayTasks(arr) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    arr.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(index) {
    document.getElementById('taskInput').value = tasks[index].text;
    editIndex = index;
    document.getElementById('addBtn').innerText = "Update Task";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRefresh();
}

// Search Filter using .filter() array method
function searchTasks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = tasks.filter(task => task.text.toLowerCase().includes(query));
    displayTasks(filtered);
}

function saveAndRefresh() {
    localStorage.setItem('web_tasks', JSON.stringify(tasks));
    displayTasks(tasks);
}