const apiUrl = "https://63e8a6beb120461c6be38ae5.mockapi.io/tasks";


async function fetchTasks() {
 const response= await fetch(apiUrl);
 const tasks=response.json();
//  renderTasks(tasks)
//  console.log(tasks);
//  return tasks
}





function openTaskModal(){
  document.getElementById("taskModal").style.display="block";

}
function closeTaskModal(){
  document.getElementById("taskModal").style.display="none";
  
}
fetchTasks();