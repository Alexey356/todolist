// получение задач при загрузке приложения
window.onload = loadTasks;

// добавление задачи в форме
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

function loadTasks() {
  // проверка задач хронящихся в локальном хранилище 
  if (localStorage.getItem("tasks") == null) return;

  // получение и преобразование задач в массив
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // добавление задач в списки
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML += `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
          <input type="text" value="${task.task}" class="task ${task.completed ? "completed" : ""}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // проверка задачи на пустоту
  if (task.value === "") {
    alert("Введите задачу!");
    return false;
  }
  // проверка существующей задачи
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Задача уже существует!");
    return false;
  }

  // добавление задачи в локальное хранилище
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  // создание элемента списка
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  // отчистка строки ввода
  task.value = "";
}
//удаление последнего элемента
function lastElement(){
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  var lastElement = tasks.pop();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//удаление первого элемента
function firstElement(){
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  var firstElement = tasks.shift();
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // удаление задачи
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}
var currentTask = null;
// получение задачи
function getCurrentTask(event) {
  currentTask = event.value;
}

// редактирование задачи и обновление хранилища
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // проверка на пустую задачу
  if (event.value === "") {
    alert("Задача пустая!");
    event.value = currentTask;
    return;
  }
  // проверка существующей задачи
  tasks.forEach(task => {
    if (task.task === event.value) {
      alert("Задача уже существует!");
      event.value = currentTask;
      return;
    }
  });
  // обновление задачи
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  // обновление локального хранилища
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
