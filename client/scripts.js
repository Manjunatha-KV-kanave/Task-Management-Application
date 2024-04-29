const API_URL = 'http://localhost:8000/tasks';

// Function to fetch tasks from the API and render them on the page
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.innerHTML = `
      <div>
        <h5 class="mb-1">${task.title}</h5>
        <p class="mb-1">${task.description}</p>
        <small>Due Date: ${new Date(task.due_date).toLocaleString()}</small>
      </div>
      <div>
      <button class="btn btn-success me-2" onclick="completeTask(${task.id},'${task.title}','${task.description}','${task.due_date}')" ${task.completion ? 'disabled' : ''}>Complete</button>
      <button class="btn btn-primary me-2" onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.due_date}')" data-bs-toggle="modal" data-bs-target="#editTaskModal">Edit</button>
        <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    if (task.completion) {
      li.classList.add('completed-task');
    }
    taskList.appendChild(li);
  });

}

// Function to add a new task
async function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const due_date = document.getElementById('due_date').value;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      due_date
    })
  });
  const newTask = await response.json();
  fetchTasks();
}

// Function to delete a task
async function deleteTask(taskId) {
  await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE'
  });
  fetchTasks();
}

// Function to complete a task
async function completeTask(taskId, title, description, due_date) {
  if (confirm('Are you sure you want to conclude this task?')) {
    await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        due_date,
        completion: true
      })
    });
  }
  fetchTasks();
}


// Function to delete a task
async function deleteTask(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      fetchTasks();
      alert('Task deleted successfully');
    } else {
      alert('Failed to delete task');
    }
  }
}
// Function to open the edit task modal with current task information
function openEditModal(title, description, due_date) {
  document.getElementById('editTitle').value = title;
  document.getElementById('editDescription').value = description;
  document.getElementById('editDueDate').value = due_date;
}


// Function to edit a task
async function updateTask() {
  const title = document.getElementById('editTitle').value;
  const description = document.getElementById('editDescription').value;
  const due_date = document.getElementById('editDueDate').value;
  const taskId = document.getElementById('editTaskId').value;

  if (title && description && due_date) {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        due_date
      })
    });
    if (response.ok) {
      fetchTasks();
      alert('Task updated successfully');
    } else {
      alert('Failed to update task');
    }
  } else {
    alert('Please enter valid values for title, description, and due date');
  }
}

// Function to edit a task
async function editTask(taskId, title, description, due_date) {
  due_date = new Date(due_date); // Example date and time
  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }

  const formatted_date = due_date.getFullYear() + '-' + padZero(due_date.getMonth() + 1) + '-' + padZero(due_date.getDate()) +
    'T' + padZero(due_date.getHours()) + ':' + padZero(due_date.getMinutes());

  openEditModal(title, description, formatted_date);
  document.getElementById('editTaskId').value = taskId;
}


fetchTasks();
