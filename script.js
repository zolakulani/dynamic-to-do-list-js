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
            addTask(taskText, false);
        });
    }

    // Function to update localStorage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function(taskItem) {
            tasks.push(taskItem.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Main function to add a new task
    function addTask(taskText = '', fromInput = true) {
        // If called from input field, get the value
        if (fromInput) {
            taskText = taskInput.value.trim();
            
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
        }

        // Create new list item
        const li = document.createElement('li');
        
        // Create text node for the task
        const taskTextNode = document.createTextNode(taskText);
        li.appendChild(taskTextNode);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // Using classList.add as requested
        
        // Add click event to remove button
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        // Append elements
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field if called from input
        if (fromInput) {
            taskInput.value = '';
            updateLocalStorage();
        }
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});