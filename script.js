const apiUrl = "https://63e8a6beb120461c6be38ae5.mockapi.io/tasks";

// Fetch tasks from the API
async function fetchTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const inProgressTasksContainer = document.getElementById("inProgressTasks");
  const doingTasksContainer = document.getElementById("doingTasks");
  const DoneTasksContainer = document.getElementById("DoneTasks");

  tasks.map((task) => {
    const taskCard = createTaskCard(task);
    doingTasksContainer.appendChild(taskCard);
    inProgressTasksContainer.appendChild(taskCard);
    DoneTasksContainer.appendChild(taskCard);
  });
}
function createTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.innerHTML = `
          <h3>title:${task.title}</h3>
          <p>description:${task.description}</p>
          <p>Due: ${task.dueDate}</p>
          <p>performer :${task.performer}</p>
          <button onclick="openEditModal(${task.id})">✏️ Edit</button>
          <button onclick="deleteTask(${task.id})">🗑️ Delete</button>
    
      `;
  return card;
}

function openTaskModal() {
  document.getElementById("taskForm").reset();
  document.getElementById("taskModal").style.display = "block";
}

function closeTaskModal() {
  document.getElementById("taskModal").style.display = "none";
}

fetchTasks();
