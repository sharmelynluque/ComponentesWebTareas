import templateHTML from "./task-trash.html";

class TaskTrash extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `

        .trash_container{
            color:var(--text-light);
            font-size:var(--font-size-m);
            font-weight: bold;

        }
        .trash_header {
            display:flex;
            align-items:center;
            gap:10px;
            cursor: pointer;
        }
         
        `;
    this.shadowRoot.appendChild(style);
    this.selectedTasks = new Set();
    this.deleteSelectedTasks = this.deleteSelectedTasks.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const deleteSelectedButton =
      this.shadowRoot.querySelector("#delete_selected");
    deleteSelectedButton.addEventListener("click", this.deleteSelectedTasks);

    document.addEventListener("task-selected", (event) => {
      const { id, selected } = event.detail;
      if (selected) {
        this.selectedTasks.add(id);
      } else {
        this.selectedTasks.delete(id);
      }
    });
  }
  deleteSelectedTasks() {
    let notas = JSON.parse(localStorage.getItem("notas")) || [];

    notas = notas.filter((nota) => !this.selectedTasks.has(nota.id.toString()));
    localStorage.setItem("notas", JSON.stringify(notas));

    const renderEvent = new CustomEvent("render-task", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(renderEvent);

    this.selectedTasks.clear();
  }
}

customElements.define("task-trash", TaskTrash);
