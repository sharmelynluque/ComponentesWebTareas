import templateHTML from "./toast-exit.html";

class ToastExit extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");

    style.textContent = `

        :host {
          position: absolute;
          top: 10px;
          right: 0;
        }
        .toast_exit{
          display: none;
          width:300px;
          height:40px;
          color:var(--text-dark);
          background-color:var(--task-bg-completed);
          border-radius:var(--border-sm);
          font-weight:var(--bold);
          position:relative;
          right:0px;
          align-content:center;
        }
          p{  
          display: flex;
          justify-content:center;
          }
 
        `;
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    document.addEventListener("open-toast", () => {
      this.open();
    });
  }

  open() {
    const toast = this.shadowRoot.querySelector("#toast_exit");
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 4000);
  }
  close() {
    const toast = this.shadowRoot.querySelector("#toast_exit");
    toast.style.display = "none";
  }
}

customElements.define("toast-exit", ToastExit);
