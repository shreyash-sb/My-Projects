const inputBox = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const clearAll = document.getElementById("clear-all");
const filters = document.querySelectorAll(".filter");

window.addEventListener("DOMContentLoaded", loadTasks);
addBtn.addEventListener("click", addTask);
clearAll.addEventListener("click", clearAllTasks);
inputBox.addEventListener("keypress", e => e.key === "Enter" && addTask());
filters.forEach(btn => btn.addEventListener("click", filterTasks));

function addTask() {
  const text = inputBox.value.trim();
  if (!text) return;
  if (isDuplicate(text)) return;
  const li = createTask(text);
  taskList.appendChild(li);
  saveTasks();
  inputBox.value = "";
  inputBox.focus();
}

function isDuplicate(text) {
  return [...document.querySelectorAll(".task-text")].some(t => t.textContent.toLowerCase() === text.toLowerCase());
}

function createTask(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const edit = document.createElement("button");
  edit.className = "edit-btn";
  edit.textContent = "✎";

  const del = document.createElement("button");
  del.className = "delete-btn";
  del.textContent = "✖";

  actions.append(edit, del);
  li.append(span, actions);

  li.addEventListener("click", e => {
    if (e.target === edit || e.target === del) return;
    li.classList.toggle("completed");
    saveTasks();
  });

  del.addEventListener("click", e => {
    e.stopPropagation();
    li.style.transform = "translateX(20px)";
    li.style.opacity = "0";
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 200);
  });

  edit.addEventListener("click", e => {
    e.stopPropagation();
    const input = document.createElement("input");
    input.value = span.textContent;
    input.className = "edit-input";
    span.replaceWith(input);
    input.focus();
    input.addEventListener("blur", () => {
      if (input.value.trim()) {
        span.textContent = input.value.trim();
        input.replaceWith(span);
        saveTasks();
      } else input.replaceWith(span);
    });
    input.addEventListener("keypress", e => {
      if (e.key === "Enter") input.blur();
    });
  });

  return li;
}

function saveTasks() {
  const data = [...document.querySelectorAll("#task-list li")].map(li => ({
    text: li.querySelector(".task-text").textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(data));
}

function loadTasks() {
  JSON.parse(localStorage.getItem("tasks") || "[]")
    .forEach(t => taskList.appendChild(createTask(t.text, t.completed)));
}

function clearAllTasks() {
  taskList.innerHTML = "";
  saveTasks();
}

function filterTasks(e) {
  filters.forEach(f => f.classList.remove("active"));
  e.target.classList.add("active");
  const mode = e.target.dataset.filter;

  document.querySelectorAll("#task-list li").forEach(li => {
    const c = li.classList.contains("completed");
    li.style.display =
      mode === "all" ||
      (mode === "completed" && c) ||
      (mode === "pending" && !c)
        ? "flex"
        : "none";
  });
}
