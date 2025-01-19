import templateHTML from "./create-task.html";

class CreateTask extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `

        
        .btn {
          padding: 10px;
          border: none;
          border-radius: var(--border-full);
          font-weight: var(--bold);
          cursor: pointer;
        }
 
        .btn_create {
          background: var(--tertiary-color);
          color: var(--text-dark);
          font-size:var(--font-size-m)
        }
 
        `;
    this.shadowRoot.appendChild(style);

    const crearBtn = this.shadowRoot.querySelector("#crear_btn");

    crearBtn.addEventListener("click", () => {
      const toggleEvent = new CustomEvent("toggle-modal", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(toggleEvent);
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {}
}

customElements.define("create-task", CreateTask);
