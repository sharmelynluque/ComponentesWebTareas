import templateHTML from "./board-task.html";

class BoardTask extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `
      #tasks_container {
        width: 100%;
      }
      .board_container{             
        margin:48px;     
        gap:60px;
        display:flex;
        flex-direction:column;
    }
      .header_container{
        display: flex; 
        justify-content:space-between;
        align-items:center;
      }
      .header_option{
        display:flex;
        gap:60px;
        align-items:center;   
      }

      .task-option{
        display:flex;
        justify-content:space-between;
        gap:25px;
      }

      .toast-exit{
        display: flex;
        flex-direction: column;
        align-items:flex-end;
      }
        `;
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const boardContainer = this.shadowRoot.querySelector("#board_container");

    this.renderTasks();

    boardContainer.addEventListener("delete-task", (event) => {
      const taskId = event.detail.id;
      let notas = JSON.parse(localStorage.getItem("notas")) || [];
      notas = notas.filter((nota) => nota.id !== parseInt(taskId));
      localStorage.setItem("notas", JSON.stringify(notas));
      this.renderTasks();
    });

    boardContainer.addEventListener("create-task", () => {
      this.renderTasks();
    });

    boardContainer.addEventListener("render-task", () => {
      this.renderTasks();
    });

    document.addEventListener("filter-changed", (event) => {
      const { complete, pending } = event.detail;
      const tareas = JSON.parse(localStorage.getItem("notas")) || [];

      const tareasFiltradas = tareas.filter((tarea) => {
        if (complete && tarea.completada) return true;
        if (pending && !tarea.completada) return true;
        return false;
      });

      this.renderTasks(tareasFiltradas);
    });
  }

  renderTasks(tareasFiltradas = null) {
    const tasksContainer = this.shadowRoot.querySelector("#tasks_container");
    let notas = JSON.parse(localStorage.getItem("notas")) || [];

    if (tareasFiltradas) {
      notas = tareasFiltradas;
    }
    tasksContainer.innerHTML = "";
    notas.map((nota) => {
      const taskElement = document.createElement("task-item");
      taskElement.setAttribute("titulo", nota.titulo);
      taskElement.setAttribute("descripcion", nota.descripcion);
      taskElement.setAttribute("status", nota.completada);
      taskElement.setAttribute("id", nota.id);
      tasksContainer.appendChild(taskElement);
    });

    if (notas.length === 0) {
      const welcomeBox = this.shadowRoot.querySelector("#welcome_default");
      const clone = welcomeBox.content.cloneNode(true);
      tasksContainer.appendChild(clone);
    }
  }
}

customElements.define("board-task", BoardTask);
