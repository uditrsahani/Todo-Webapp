// Retrieve todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  const todosContainer = document.getElementById("todos-container");
  todosContainer.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    if (todo.done) {
      todoItem.classList.add("done");
    }

    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = todo.text;

    const todoButtons = document.createElement("div");
    todoButtons.classList.add("todo-buttons");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#128465;";
    deleteButton.classList.add("delete");
    deleteButton.onclick = () => deleteTodo(index);

    const updateButton = document.createElement("button");
    updateButton.innerHTML = "&#9998;";
    updateButton.onclick = () => updateTodo(index);

    const markDoneButton = document.createElement("button");
    markDoneButton.innerHTML = "&#10004;";
    markDoneButton.onclick = () => markDone(index);

    todoButtons.appendChild(deleteButton);
    todoButtons.appendChild(updateButton);
    todoButtons.appendChild(markDoneButton);

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoButtons);

    todosContainer.appendChild(todoItem);
  });
}

function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    todos.push({ text: todoText, done: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
    todoInput.value = "";
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function updateTodo(index) {
  const updatedTodoText = prompt("Enter updated todo:", todos[index].text);
  if (updatedTodoText !== null) {
    todos[index].text = updatedTodoText.trim();
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
}

function markDone(index) {
  todos[index].done = !todos[index].done;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

renderTodos(); // Initial rendering
