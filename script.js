import checkComplete from "./components/checkComplete.js"
import deleteIcon from "./components/deleteIcon.js"
  
  
const btn = document.querySelector("[data-form-btn]");
const list = document.querySelector("[data-list]");
const input = document.querySelector('[data-form-input]');

// Obtener tareas desde localStorage o inicializar un array vacío
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Cargar tareas al iniciar la página
tasks.forEach(task => {
  list.appendChild(createTaskElement(task.text, task.completed));
});

function createTaskElement(text, completed = false) {
  const task = document.createElement("li");
  task.classList.add("card");

  const taskContent = document.createElement("div");
  taskContent.appendChild(checkComplete(completed));

  const titleTask = document.createElement("span");
  titleTask.classList.add("task");
  titleTask.innerText = text;
  taskContent.appendChild(titleTask);

  task.appendChild(taskContent);
  task.appendChild(deleteIcon());

  // Marcar como completada si es necesario
  if (completed) {
    checkCompleteHandler(task);
  }

  return task;
}


function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTask(event) {
  event.preventDefault();
  const value = input.value;
  const taskElement = createTaskElement(value);

  input.value = '';
  list.appendChild(taskElement);

  // Actualizar el array de tareas y guardar en localStorage
  tasks.push({ text: value, completed: false });
  saveTasksToLocalStorage();
}

function checkCompleteHandler(taskElement) {
  const icon = taskElement.querySelector('.icon');
  icon.classList.toggle('fas');
  icon.classList.toggle('completeIcon');
  icon.classList.toggle('far');
}

function completeTask(event) {
  const taskElement = event.target.closest('.card');
  taskElement.classList.toggle('completed');

  // Actualizar el array de tareas y guardar en localStorage
  const index = Array.from(list.children).indexOf(taskElement);
  tasks[index].completed = !tasks[index].completed;
  saveTasksToLocalStorage();
}

function deleteTask(event) {
  const taskElement = event.target.closest('.card');
  taskElement.remove();

  // Actualizar el array de tareas y guardar en localStorage
  const index = Array.from(list.children).indexOf(taskElement);
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
}

btn.addEventListener('click', createTask);

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('icon')) {
    const action = event.target.classList.contains('fa-check-square') ? completeTask : deleteTask;
    action(event);
  }
});
