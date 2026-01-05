// Socket.IO Client for Real-Time Task Board
const socket = io();

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskPriority = document.getElementById('taskPriority');
const usernameInput = document.getElementById('username');
const userCountElement = document.getElementById('userCount');
const typingIndicator = document.getElementById('typingIndicator');
const notification = document.getElementById('notification');

// Task columns
const pendingTasks = document.getElementById('pendingTasks');
const inProgressTasks = document.getElementById('inProgressTasks');
const completedTasks = document.getElementById('completedTasks');

// Typing indicator timeout
let typingTimeout;

// Initialize - Load existing tasks
async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    
    // Clear all columns
    pendingTasks.innerHTML = '';
    inProgressTasks.innerHTML = '';
    completedTasks.innerHTML = '';
    
    // Render each task
    tasks.forEach(task => renderTask(task));
  } catch (error) {
    showNotification('Failed to load tasks', 'error');
  }
}

// Render a task card
function renderTask(task) {
  const taskCard = document.createElement('div');
  taskCard.className = `task-card priority-${task.priority}`;
  taskCard.id = `task-${task._id}`;
  
  const createdDate = new Date(task.createdAt).toLocaleDateString();
  
  taskCard.innerHTML = `
    <div class="task-title">${escapeHtml(task.title)}</div>
    ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
    <div class="task-meta">
      <span>By: ${escapeHtml(task.createdBy)}</span>
      <span class="priority-badge ${task.priority}">${task.priority.toUpperCase()}</span>
    </div>
    <div class="task-meta">
      <span>Created: ${createdDate}</span>
    </div>
    <div class="task-actions">
      ${getActionButtons(task)}
    </div>
  `;
  
  // Add to appropriate column
  const column = getColumnByStatus(task.status);
  column.appendChild(taskCard);
}

// Get action buttons based on task status
function getActionButtons(task) {
  switch (task.status) {
    case 'pending':
      return `
        <button class="btn-progress" onclick="updateStatus('${task._id}', 'in-progress')">Start</button>
        <button class="btn-complete" onclick="updateStatus('${task._id}', 'completed')">Complete</button>
        <button class="btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
      `;
    case 'in-progress':
      return `
        <button class="btn-reopen" onclick="updateStatus('${task._id}', 'pending')">Back to Pending</button>
        <button class="btn-complete" onclick="updateStatus('${task._id}', 'completed')">Complete</button>
        <button class="btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
      `;
    case 'completed':
      return `
        <button class="btn-reopen" onclick="updateStatus('${task._id}', 'pending')">Reopen</button>
        <button class="btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
      `;
    default:
      return '';
  }
}

// Get column element by status
function getColumnByStatus(status) {
  switch (status) {
    case 'pending':
      return pendingTasks;
    case 'in-progress':
      return inProgressTasks;
    case 'completed':
      return completedTasks;
    default:
      return pendingTasks;
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Show notification
function showNotification(message, type = 'info') {
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Update task status via Socket.IO
function updateStatus(taskId, newStatus) {
  socket.emit('updateTaskStatus', {
    taskId: taskId,
    status: newStatus
  });
}

// Delete task via Socket.IO
function deleteTask(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    socket.emit('deleteTask', taskId);
  }
}

// Form submission - Create new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const priority = taskPriority.value;
  const createdBy = usernameInput.value.trim() || 'Anonymous';
  
  if (!title) {
    showNotification('Please enter a task title', 'error');
    return;
  }
  
  // Emit new task via Socket.IO
  socket.emit('createTask', {
    title,
    description,
    priority,
    createdBy
  });
  
  // Clear form
  taskTitle.value = '';
  taskDescription.value = '';
  taskPriority.value = 'medium';
  
  socket.emit('userStoppedTyping');
});

// Typing indicator
taskTitle.addEventListener('input', () => {
  const username = usernameInput.value.trim() || 'Someone';
  socket.emit('userTyping', username);
  
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit('userStoppedTyping');
  }, 1000);
});

// Socket.IO Event Listeners

// New task created
socket.on('taskCreated', (task) => {
  renderTask(task);
  showNotification(`New task: "${task.title}" added by ${task.createdBy}`, 'success');
});

// Task updated
socket.on('taskUpdated', (task) => {
  // Remove old card
  const oldCard = document.getElementById(`task-${task._id}`);
  if (oldCard) {
    oldCard.remove();
  }
  
  // Render updated task in new column
  renderTask(task);
  showNotification(`Task "${task.title}" moved to ${task.status}`, 'info');
});

// Task deleted
socket.on('taskDeleted', (taskId) => {
  const card = document.getElementById(`task-${taskId}`);
  if (card) {
    card.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => card.remove(), 300);
  }
  showNotification('Task deleted', 'info');
});

// User count update
socket.on('userCount', (count) => {
  userCountElement.textContent = `${count} user${count !== 1 ? 's' : ''} online`;
});

// Typing indicator
socket.on('userTyping', (username) => {
  typingIndicator.textContent = `${username} is typing...`;
});

socket.on('userStoppedTyping', () => {
  typingIndicator.textContent = '';
});

// Connection events
socket.on('connect', () => {
  showNotification('Connected to server', 'success');
  loadTasks();
});

socket.on('disconnect', () => {
  showNotification('Disconnected from server', 'error');
});

socket.on('error', (error) => {
  showNotification(error.message, 'error');
});

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
