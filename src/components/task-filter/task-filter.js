import templateHTML from "./task-filter.html";

class TaskFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `

        .filter_container{
            color:var(--text-light);
            font-size:var(--font-size-m);
            font-weight: bold;
            cursor:pointer;
        }
        .filter_option{
            background-color: var(--secondary-color);
            color:var(--text-light);
            width:110px;
            height:140px;
            padding:10px 16px;
            border-radius: var(--border-sm);
            box-shadow: var(--shadow-dark);
            line-height: 45px;
            font-weight: normal;
            display:none;
            position:absolute;
          }
          
          .filter_option input{
              cursor: pointer;
          }
 
        `;
    this.shadowRoot.appendChild(style);
    this.completeCheckbox = this.shadowRoot.querySelector("#complete");
    this.pendingCheckbox = this.shadowRoot.querySelector("#pending");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const filterHeader = this.shadowRoot.querySelector(".filter_header");
    const filterOption = this.shadowRoot.querySelector(".filter_option");

    filterHeader.addEventListener("click", () => {
      filterOption.style.display =
        filterOption.style.display !== "block" ? "block" : "none";
    });

    this.completeCheckbox.addEventListener("change", () => this.filter());
    this.pendingCheckbox.addEventListener("change", () => this.filter());
  }

  filter() {
    const complete = this.completeCheckbox.checked;
    const pending = this.pendingCheckbox.checked;

    const filterEvent = new CustomEvent("filter-changed", {
      detail: { complete, pending },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(filterEvent);
  }
}

customElements.define("task-filter", TaskFilter);
