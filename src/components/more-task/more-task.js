import templateHTML from "./more-task.html";

class MoreTask extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `

        .more_container{
            color:var(--text-light);
            font-size:var(--font-size-m);
            font-weight: bold;
        }
        .more_option{
            background-color: var(--secondary-color);
            color:var(--text-light);
            width:110px;
            height:90px;
            padding:10px 16px;
            border-radius: var(--border-sm);
            justify-content: center;
            align-items:center;
            box-shadow: var(--shadow-dark);
            line-height: 45px;
            font-weight: normal;
            display: none; 
            position:absolute;
          }
          
          .more_header img{
              cursor: pointer;
          }
          .more_option img{
              cursor: pointer;
          }
 
        `;
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const moreHeader = this.shadowRoot.querySelector(".more_header");
    const moreOption = this.shadowRoot.querySelector(".more_option");
    moreHeader.addEventListener("click", () => {
      moreOption.style.display =
        moreOption.style.display === "none" ? "block" : "none";
    });

    const eliminar = this.shadowRoot.querySelector("#eliminar");
    eliminar.addEventListener("click", () => {
      const deleteEvent = new CustomEvent("delete", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(deleteEvent);
    });

    const editar = this.shadowRoot.querySelector("#editar");
    editar.addEventListener("click", () => {
      const editEvent = new CustomEvent("edit", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(editEvent);
    });
  }
}

customElements.define("more-task", MoreTask);
