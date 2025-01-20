import templateHTML from "./task-item.html";

class TaskItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `
        .container{
            display: flex;
            gap: 10px;
            width: 100%;
        }
        .card_task{
            background: var(--bg-dark);
            color: var(--text-light);
            border-radius:var(--border-sm);
            padding: 16px;
            margin-bottom: 10px;
            width: 100%;
        }

        .header_card{
            display: flex;
            justify-content: space-between;
            align-items:center;
        }

        card_task p{
            overflow: hidden;
        }


        #complete_btn{
            background: var(--task-bg-completed);
            border:none;
            border-radius:var(--border-full);
            font-weight:bold;  
            padding: 8px;  
            height: 32px;

        }

        #pending_btn{ 
            background: var(--task-bg-pending);
            border:none;
            border-radius:var(--border-full);
            font-weight:bold;  
            padding: 8px;  
            height: 32px;

        }

        #task_description{
            background: var(--bg-dark-t);
            padding:16px;
            border-radius:var(--border-sm);
        }

        .header_card img{
            cursor:pointer;
        }

        @media  (min-width: 844px){
        
        }




        `;
    this.shadowRoot.appendChild(style);
    this.openModal = this.openModal.bind(this);
    this.openModalEditar = this.openModalEditar.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const titulo = this.getAttribute("titulo") || "Sin título";
    const descripcion = this.getAttribute("descripcion") || "Sin descripción";
    const status = this.getAttribute("status") || false;

    this.shadowRoot.querySelector("#task_title").textContent = titulo;
    this.shadowRoot.querySelector("#task_description").textContent =
      descripcion;
    let status_box = this.shadowRoot.querySelector(".status");
    const checkbox = this.shadowRoot.querySelector("#complete");

    if (status === "true") {
      status_box.textContent = "Marcar como pendiente";
      status_box.id = "pending_btn";
    } else {
      status_box.textContent = "Marcar como completada";
      status_box.id = "complete_btn";
    }

    const task = this.shadowRoot.querySelector(".container");
    task.addEventListener("delete", this.openModal);

    status_box.addEventListener("click", (event) => {
      const taskId = this.getAttribute("id");
      const notas = JSON.parse(localStorage.getItem("notas")) || [];

      const tarea = notas.find((nota) => nota.id === parseInt(taskId));
      if (tarea) {
        tarea.completada = !tarea.completada;
        localStorage.setItem("notas", JSON.stringify(notas));

        if (tarea.completada) {
          status_box.textContent = "Marcar como pendiente";
          status_box.id = "pending_btn";
        } else {
          status_box.textContent = "Marcar como completada";
          status_box.id = "complete_btn";
        }
      } else {
        console.error(`Tarea con ID ${taskId} no encontrada.`);
      }
    });

    document.addEventListener("select-all", () => {
      checkbox.checked = true;
      const selectEvent = new CustomEvent("task-selected", {
        detail: {
          id: this.getAttribute("id"),
          selected: checkbox.checked,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(selectEvent);
    });

    checkbox.addEventListener("change", () => {
      const selectEvent = new CustomEvent("task-selected", {
        detail: {
          id: this.getAttribute("id"),
          selected: checkbox.checked,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(selectEvent);
    });
    task.addEventListener("edit", this.openModalEditar);
  }

  openModal() {
    const deleteEvent = new CustomEvent("open-delete-task", {
      detail: { id: this.getAttribute("id") },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(deleteEvent);
  }

  openModalEditar() {
    const editEvent = new CustomEvent("open-edit", {
      detail: {
        id: this.getAttribute("id"),
        titulo: this.getAttribute("titulo"),
        descripcion: this.getAttribute("descripcion"),
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(editEvent);
  }
}

customElements.define("task-item", TaskItem);
