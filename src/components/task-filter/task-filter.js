import templateHTML from './task-filter.html';

class TaskFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement('style');

    style.textContent = `

        .filter_container{
            color:var(--text-light);
            font-size:var(--font-size-m);
            font-weight: bold;
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
          
          .filter_header img{
              cursor: pointer;
          }
          .filter_option input{
              cursor: pointer;

          }
 
        `;
    this.shadowRoot.appendChild(style);

  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Manejo de eventos
    const filterHeader = this.shadowRoot.querySelector('.filter_header');
    const filterOption = this.shadowRoot.querySelector('.filter_option');

    filterHeader.addEventListener('click', () => {
      filterOption.style.display = filterOption.style.display === 'none' ? 'block' : 'none';
    });
  }


}

customElements.define('task-filter', TaskFilter);
