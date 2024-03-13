const add = document.querySelector(".add");
const liste = document.querySelector(".liste");
let todos = [{ description: "", ID: 0, done: false }];
const checkboxinliste = document.querySelectorAll(".check");

document.addEventListener("DOMContentLoaded", function () {
  loadFromLocalStorage();
  addToList();
});

// Funktion zum Laden des Local Storage
function loadFromLocalStorage() {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    renderToDos();
    addcheckListener();
  }
}

//Funktion zum hinzufügen des Eventlisteners zu checkboxen
function addcheckListener() {
  checkboxinliste.forEach(function (checkbox) {
    checkbox.addEventListener("click", removeDoneToDos);
  });
}

// Funktion zum Speichern der Todos im Local Storage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// neue ToDos mit button zum array hinzufügen
loadFromLocalStorage();
add.addEventListener("click", addToList);

function addToList() {
  const input = document.querySelector(".input").value;
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

    const span = document.createElement("span");
    span.textContent = todo.description;

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
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
  todos.forEach(function (todo, index) {
    if (todo.done === true) {
      todos.splice(index, 1);
    }
  });
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
