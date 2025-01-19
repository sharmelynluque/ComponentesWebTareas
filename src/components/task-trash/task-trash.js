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
        .trash_header img{
              cursor: pointer;
        }
 
        .trash_header {
            display:flex;
            align-items:center;
            gap:10px;
        }
         
        `;
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {}
}

customElements.define("task-trash", TaskTrash);
