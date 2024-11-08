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

  inProgressTasksContainer.innerHTML = "";
  doingTasksContainer.innerHTML = "";
  DoneTasksContainer.innerHTML = "";

  tasks.map((task) => {
    const taskCard = createTaskCard(task);

    if (task.status === "inprogress") {
      inProgressTasksContainer.appendChild(taskCard);
      task.status === "inprogress"
      createTaskCard(task)
    } else if (task.status === "doing") {
      doingTasksContainer.appendChild(taskCard);
      task.status === "doing"
      createTaskCard(task)
    } else {
      DoneTasksContainer.appendChild(taskCard);
      task.status === "done"
      createTaskCard(task)
    }
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
           <select id="status-select-${task.id}" onchange="moveTask(${task.id})">
        <option value="inprogress" ${task.status === "inProgress" ? "selected" : ""}>In Progress</option>
        <option value="doing" ${task.status === "doing" ? "selected" : ""}>Doing Tasks</option>
        <option value="done" ${task.status === "done" ? "selected" : ""}>Done Tasks</option>
      </select>
      `;
  return card;
}

async function saveTask(e) {
  e.preventDefault();
  const newTask = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    dueDate: document.getElementById("taskDueDate").value,
    performer: document.getElementById("taskPerformer").value,
    status: document.getElementById("taskStatus").value,
  };
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  fetchTasks();
  closeTaskModal();
}

async function moveTask(taskId) {
  const selectElement = document.getElementById(`status-select-${taskId}`);
  console.log(selectElement);
  
  const newStatus = selectElement.value; //we can  Get the selected value from the <select>
  console.log(newStatus);

  const task = await fetch(`${apiUrl}/${taskId}`).then((res) => res.json());
  task.status = newStatus;

  await fetch(`${apiUrl}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  fetchTasks();
}




async function deleteTask(taskId) {
    await fetch(`${apiUrl}/${taskId}`, { method: "DELETE" });
    fetchTasks();
  }



// Open the task modal for editing
function openEditModal(taskId) {
  // Fetch the task data and populate the modal fields
  fetch(`${apiUrl}/${taskId}`)
    .then((response) => response.json())
    .then((task) => {
      document.getElementById("taskTitle").value = task.title;
      document.getElementById("taskDescription").value = task.description;
      document.getElementById("taskDueDate").value = task.dueDate;
      document.getElementById("taskPerformer").value = task.performer;
      document.getElementById("taskStatus").value = task.status;
      document.getElementById("taskForm").onsubmit = (e) =>
        updateTask(e, taskId);
      document.getElementById("taskModal").style.display = "block";
    });
}


  async function updateTask(event, taskId) {
    event.preventDefault();
    const updatedTask = {
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDescription").value,
      dueDate: document.getElementById("taskDueDate").value,
      performer: document.getElementById("taskPerformer").value,
      status: document.getElementById("taskStatus").value,
    };
    await fetch(`${apiUrl}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
    closeTaskModal();
  }

  
  

document.getElementById("search").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll(".task-card");
  tasks.forEach((task) => {
    const title = task.querySelector("h3").textContent.toLowerCase();
    task.style.display = title.includes(searchTerm) ? "block" : "none";
  });
});




function openTaskModal() {
  document.getElementById("taskForm").reset();
  document.getElementById("taskForm").onsubmit = saveTask;

  document.getElementById("taskModal").style.display = "block";
}

function closeTaskModal() {
  document.getElementById("taskModal").style.display = "none";
}



fetchTasks();
