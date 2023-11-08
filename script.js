document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar elementos DOM
  var input = document.getElementById("taskInput");
  var addButton = document.getElementById("addButton");
  var removeButton = document.getElementById("removeButton");
  var update = document.getElementById("update");
  var taskList = document.getElementById("taskList");

  // Crear array para almacenar las tareas
  var tareas = [];

  // Añadir botón evento listener
  addButton.addEventListener("click", function () {
    if (input.value.trim() != "") {
      agregarTarea();
    }
  });

  // Agregar evento al presionar Enter
  input.addEventListener("keyup", function (event) {
    // Código de tecla Enter
    if (event.keyCode === 13) {
      if (input.value.trim() != "") {
        agregarTarea();
      }
    }
  });

  // Evento click de los íconos de las tareas
  taskList.addEventListener("click", (event) => {
    if (event.target.id === "doneIcon") {
      cambiarEstado(event.target.parentNode.parentNode.textContent);
    } else if (event.target.id === "repeatIcon") {
      cambiarEstado(event.target.parentNode.parentNode.textContent);
    } else if (event.target.id === "deleteIcon") {
      eliminarTarea(event.target.parentNode.parentNode.textContent);
      if (tareas.length === 0) {
        // Ocultar el botón de eliminar, si ya no hay más tareas
        removeButton.style.display = "none";
      }
    }
  });

  // Evento click del removeButton
  removeButton.addEventListener("click", () => {
    // Vaciar el array de tareas
    tareas = [];

    // Llamar a la función que refleja los cambios en la app
    actualizarLista();

    // Ocultar el botón de eliminar las tareas
    removeButton.style.display = "none";
  });

  // Función para agregar una tarea
  function agregarTarea() {
    // Conseguir el valor del campo input
    var taskText = input.value;

    // Crear nuevo objeto de la tarea
    var newTask = {
      nombre: taskText,
      completada: false,
    };

    // Añadir la nueva tarea al array de tareas
    tareas.push(newTask);

    // Limpiar el campo input
    input.value = "";

    // Actualizar la lista de tareas en el HTML
    actualizarLista();

    // Hacer que se muestre el bbotón de eliminar
    removeButton.style.display = "block";
  }

  // Función para recorrer el array de tareas y generar los elementos <li> correspondientes
  function actualizarLista() {
    // Limpiar la lista existente
    taskList.innerHTML = "";

    organizarTareas();

    // Recorrer el array de tareas
    for (var i = 0; i < tareas.length; i++) {
      var tarea = tareas[i];

      // Crear un nuevo elemento <li>
      var newTaskElement = document.createElement("li");

      // Crear un contenedor para los íconos de las tareas
      var iconsContainer = document.createElement("div");
      iconsContainer.classList.add("iconsContainer");

      // Establecer el texto de la tarea
      newTaskElement.textContent = tarea.nombre;

      // Crear los íconos
      var doneIcon = document.createElement("img");
      doneIcon.src = "img/done.png";
      doneIcon.classList.add("icon");
      doneIcon.setAttribute("id", "doneIcon");

      var repeatIcon = document.createElement("img");
      repeatIcon.src = "img/repeat.png";
      repeatIcon.classList.add("icon");
      repeatIcon.setAttribute("id", "repeatIcon");

      var deleteIcon = document.createElement("img");
      deleteIcon.src = "img/delete.png";
      deleteIcon.classList.add("icon");
      deleteIcon.setAttribute("id", "deleteIcon");

      // Verificar si la tarea está completada y agregar la clase "completada"
      if (tarea.completada) {
        newTaskElement.classList.add("completada");
        iconsContainer.appendChild(repeatIcon); // Agregar ícono al contenedor
      } else {
        newTaskElement.classList.remove("completada");
        iconsContainer.appendChild(doneIcon); // Agregar ícono al contenedor
      }

      // Agregar ícono al contenedor
      iconsContainer.appendChild(deleteIcon);

      // Agregar el contenedor de los íconos al elemento <li>
      newTaskElement.appendChild(iconsContainer);

      // Agregar el elemento <li> a la lista de tareas
      taskList.appendChild(newTaskElement);
    }
  }

  // Función para eliminar una tarea
  function eliminarTarea(nombreTarea) {
    for (let i = 0; i < tareas.length; i++) {
      if (nombreTarea === tareas[i].nombre) {
        tareas.splice(i, 1);
        break;
      }
    }
    // Llammar a la funcion que refleja los cambios en la app
    actualizarLista();
  }

  // Función para cambiar la propiedad "completada" de las tareas
  function cambiarEstado(nombreTarea) {
    for (let i = 0; i < tareas.length; i++) {
      if (nombreTarea === tareas[i].nombre) {
        if (tareas[i].completada) {
          tareas[i].completada = false;
          break;
        } else {
          tareas[i].completada = true;
          break;
        }
      }
    }
    // Llammar a la funcion que refleja los cambios en la app
    actualizarLista();
  }

  // Función para organizar las tareas, mostrando todas las pendientes primero
  function organizarTareas() {
    tareas.sort((a, b) => {
      if (a.completada && !b.completada) {
        return 1;
      } else if (!a.completada && b.completada) {
        return -1;
      }
    });
  }
});
