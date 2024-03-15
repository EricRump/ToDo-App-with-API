const add = document.querySelector(".add");
const liste = document.querySelector(".liste");
let todos = [];
const api = "http://localhost:4730/todos/";

document.addEventListener("DOMContentLoaded", function () {
  loadFromApi();
  addToList();
  console.log(todos);
});

// Funktion zum Laden des Local Storage
function loadFromApi() {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      todos.push(...data);
      renderToDos();
    });
}

// Funktion zum Speichern der Todos im Local Storage
function saveToApi() {
  let newtodo = [];
  todos.forEach((todo) => {
    if (!todo.hasOwnProperty("id") && todo.description != "") {
      newtodo.push(todo);
    }
  });
  if (newtodo.length > 0) {
    fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newtodo[0]),
    });
  }
  newtodo = [];
}

// neue ToDos mit button zum array hinzufügen
add.addEventListener("click", addToList);

function addToList() {
  const input = document.querySelector(".input").value;
  if (input !== "") {
    todos.push({
      description: input,
      done: false,
    });
    renderToDos();
    document.querySelector(".input").value = "";
    document.querySelector(".input").focus();
  } else {
    console.log("Das Element ist bereits in der Liste vorhanden.");
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
  saveToApi();
}

liste.addEventListener("change", function (event) {
  if (event.target.classList.contains("check")) {
    const todoDescription = event.target.dataset.description;
    const todo = todos.find((t) => t.description === todoDescription);

    if (todo) {
      todo.done = event.target.checked;

      fetch(api + todo.id, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(todo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update todo on the server");
          }
          console.log("Todo successfully updated on the server.");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error(
        "Todo with description " +
          todoDescription +
          " not found in the todos array."
      );
    }
  } else {
    console.log("dadadam");
  }
});

// RemoveButton
const removeButton = document.querySelector(".removeButton");
removeButton.addEventListener("click", function () {
  for (let i = todos.length - 1; i >= 0; i--) {
    const todo = todos[i];
    if (todo.done === true) {
      todos.splice(i, 1);
      fetch(api / todo[i].id, {
        method: "DELETE",
      });
    }
  }
  renderToDos();
  saveToApi();
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
