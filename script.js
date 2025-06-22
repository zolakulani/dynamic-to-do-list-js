document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when page loads
    loadTasks();

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        tasks.forEach(function(taskText) {
            createTaskElement(taskText, false);
        });
    }

    // Function to create a task element
    function createTaskElement(taskText, saveToStorage = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (saveToStorage) {
            updateLocalStorage();
        }
    }

    // Function to update localStorage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function(taskItem) {
            // Get text content without the "Remove" button text
            tasks.push(taskItem.textContent.replace('Remove', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        createTaskElement(taskText);
        taskInput.value = '';
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});