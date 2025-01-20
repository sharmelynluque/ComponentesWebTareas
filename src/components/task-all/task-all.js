import templateHTML from "./task-all.html";

class TaskAll extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `

        .all_container{
            color:var(--text-light);
            font-size:var(--font-size-m);
            font-weight: bold;
            display:flex;

        }

        .all_header{
            display:flex;
            align-items:center;
            gap: 10px;
            cursor:pointer;

        }
        .all_header .icon{
            width:30px;
            height:30px;
            background:var(--text-light);
            border-radius:var(--border-full)
        }
 
        `;
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const selectAllButton = this.shadowRoot.querySelector("#select_all");

    selectAllButton.addEventListener("click", () => {
      const selectAllEvent = new CustomEvent("select-all", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(selectAllEvent);
    });
  }
}

customElements.define("task-all", TaskAll);
