import templateHTML from "./modal-trash.html";

class ModalTrash extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `
        
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--text-light);
        }
        #modal_trash {
          display: none;
          position: absolute;
          top: 200px;
        }
        .modal {
          background: black;
          padding: 20px;
          border-radius: var(--border-sm);
          box-shadow: var(--shadow-dark);
          width: 600px;
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: var(--gap-xs);


        }

        .modal-text{
        }
        h1 {
          font-size: 1.5rem;
          margin-bottom: var(--gap-xs);
        }

       
             
        .icon{
          display:flex;
          justify-content:center;
          flex-direction:column;
          align-items:center;
        }
        .modal_actions {
          display: flex;
          justify-content: space-around;
          gap: var(--gap-xs);
          align-items:center;
        }

        .btn {
          padding: 10px;
          border: none;
          border-radius: var(--border-full);
          font-weight: var(--bold);
          cursor: pointer;
        }

        .btn_cancel {
          width:148px;
          background: var(--task-bg-pending);
          color: var(--text-dark);
        }

        .btn_continue {
          width:148px;
          background: var(--primary-color);
          color: var(--text-light);
        }
        `;
    this.shadowRoot.appendChild(style);
    this.taskId = "";
    this.close = this.close.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.modalTrash = this.shadowRoot.querySelector("#modal_trash");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    document.addEventListener("open-delete-task", (event) => {
      const id = event.detail.id;
      console.log(id);
      this.taskId = id;
      const modal = this.shadowRoot.querySelector("#modal_trash");
      modal.style.display = "block";
    });

    const cancelBtn = this.shadowRoot.querySelector("#btn_cancel");
    const confirmarBtn = this.shadowRoot.querySelector("#btn_confirmar");

    confirmarBtn.addEventListener("click", this.deleteTask);
    cancelBtn.addEventListener("click", () => this.close());
  }

  deleteTask() {
    console.log(this.taskId);
    const deleteEvent = new CustomEvent("delete-task", {
      detail: { id: this.taskId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(deleteEvent);
    console.log(this.modalTrash);
    this.modalTrash.style.display = "none";
  }
  close() {
    const modal = this.shadowRoot.querySelector("#modal_trash");
    modal.style.display = "none";
  }
}

customElements.define("modal-trash", ModalTrash);
