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

    if(task.status==="inProgress"){
inProgressTasksContainer.appendChild(taskCard);
    }else if(task.status==="doingTasks"){
    doingTasksContainer.appendChild(taskCard);

    }else {
            DoneTasksContainer.appendChild(taskCard);

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
          <select >
            <option value="inProgress">inProgress</option>
            <option value="doing" >doingTasks</option>
            <option value="done">DoneTasks</option>
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
      await fetch(apiUrl,{
        method:"POST",
        headers:{"Content-Type": "application/json",},
        body:JSON.stringify(newTask)
      })
      fetchTasks()
      closeTaskModal()
}

function openTaskModal() {
  document.getElementById("taskForm").reset();
  document.getElementById("taskForm").onsubmit=saveTask;

  document.getElementById("taskModal").style.display = "block";
  
}

function closeTaskModal() {
  document.getElementById("taskModal").style.display = "none";
}

fetchTasks();
