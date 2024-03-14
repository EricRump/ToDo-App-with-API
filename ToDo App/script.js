const add = document.querySelector(".add");
const liste = document.querySelector(".liste");
let todos = [{ description: "", ID: 0, done: false }];

document.addEventListener("DOMContentLoaded", function () {
  loadFromLocalStorage();
});

// Funktion zum Laden des Local Storage
function loadFromLocalStorage() {
  fetch("http://localhost:4730/todos")
    .then((response) => response.json())
    .then((data) => (todos = data));
  /*if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    renderToDos();
  }*/
}

// Funktion zum Speichern der Todos im Local Storage
function saveToLocalStorage() {
  const input = document.querySelector(".input").value.trim();
  const newtodo = {
    description: "input",
  };
  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newtodo),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  /*localStorage.setItem("todos", JSON.stringify(todos));*/
}

// neue ToDos mit button zum array hinzufügen
add.addEventListener("click", addToList);

function addToList() {
  const input = document.querySelector(".input").value.trim();
  if (input !== "") {
    const existingTodo = todos.find(
      (todo) => todo.description.toLowerCase() === input.toLowerCase()
    );
    if (!existingTodo) {
      todos.push({
        description: input,
        ID: Math.floor(Math.random() * 9999999999),
        done: false,
      });
      renderToDos();
      document.querySelector(".input").value = "";
      document.querySelector(".input").focus();
    } else {
      console.log("Das Element ist bereits in der Liste vorhanden.");
    }
  }
}

// hinzufügen der Todos zur Liste
function renderToDos() {
  liste.innerHTML = "";

  todos.forEach(function (todo) {
    const listItem = document.createElement("li");
    listItem.classList.add("aufgabe");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("check");
    checkbox.dataset.id = todo.ID;
    checkbox.checked = todo.done;

    const label = document.createElement("label");
    label.textContent = todo.description;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    liste.appendChild(listItem);
  });
  saveToLocalStorage();
}

liste.addEventListener("change", function (event) {
  if (event.target.classList.contains("check")) {
    const todoID = parseInt(event.target.dataset.id);
    const todo = todos.find((t) => t.ID === todoID);
    todo.done = event.target.checked;
    saveToLocalStorage();
  }
});

// RemoveButton
const removeButton = document.querySelector(".removeButton");
removeButton.addEventListener("click", function () {
  for (let i = todos.length - 1; i >= 0; i--) {
    const todo = todos[i];
    if (todo.done === true) {
      todos.splice(i, 1);
    }
  }
  renderToDos();
  saveToLocalStorage();
});

// Filter
const radiobuttons = document.querySelectorAll(".radio");

radiobuttons.forEach(function (radio) {
  radio.addEventListener("change", function () {
    liste.classList.remove("all");
    liste.classList.remove("open");
    liste.classList.remove("done");
    liste.classList.add(radio.value);
  });
});
