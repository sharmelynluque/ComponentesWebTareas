import './welcome-task.css';
import templateHTML from './welcome-task.html';

class WelcomeTask extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement('style');

    style.textContent = `
        
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          width: var(--w-full);
          height: var(--h-full);
        }

        .welcome-task {
           display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 42px;
          color: var(--text-light);

        }

        h1 {
          text-align: center;
          line-height:12px; 
        }

        .create-task{
          animation: pulse 1s infinite;
        }
        .create-task.clicked {
          animation: none;
        }
        
         @keyframes pulse {
          0%, 100% {
            transform: scale(1);  
          }
          50% {
            transform: scale(1.1); 
          }
        }
        }
        `;
    this.shadowRoot.appendChild(style);

  }

  connectedCallback() {
    this.render();
  }

  render() {

    const createTaskButton = this.shadowRoot.querySelector('.create-task');

    createTaskButton.addEventListener('click', () => {
      createTaskButton.classList.add('clicked');
      console.log('Botón de crear tarea clickeado');
    });
  }

}

customElements.define('welcome-task', WelcomeTask);
