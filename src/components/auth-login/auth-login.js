import templateHTML from "./auth-login.html";

class AuthLogin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = templateHTML;
    const style = document.createElement("style");
    style.textContent = ` 
          
              .auth_login{
                background:var(--gradient-color-hard);
                width:var(--w-full);
                height: var(--h-full);
                display:flex;
                justify-content: center;  
                align-items: center;
                font-weight:bold;
             }


             
            .login{
                display:flex;
                justify-content:center;
                gap: 250px;
                align-items: center; 
                width:80%;
                height: 50%;
                color:var(--text-light);
                background:var(--bg-light);
                box-shadow: var(--shadow-dark);
                border-radius: var(--border-sm);

            }
            

            .form_login{
                 display:flex;
                 flex-direction:column;
                 gap:20px; 
                width:20%;         
            }

            .form_login .boton_login {
                background-color: var(--tertiary-color);
                border:none;
                border-radius:var(--border-full);
                font-weight:bold;  
                padding: 8px;
            }

            .boton_login_disable{
                background: var(--task-bg-pending);
                border:none;
                border-radius:var(--border-full);
                font-weight:bold;  
                padding: 8px;  
           }
                
            .form_login input {
                display:flex;
                border:none;
                border-radius:var(--border-full);
                padding:8px;
                width:var(--w-full); 
            }

            @media  (max-width: 1112px){
            .login{
                gap:100px;
            }

            .logo_login img{
                width: 200px;
                display: block;
        
            }

            .form_login{
                width:30%;

            }
        }


         @media  (max-width: 562px){
            .login{
                gap:0px;
                width:80%;

            }

            .form_login{
                width:80%;

            }

            .logo_login img{
                width: 200px;
                display: none;

            }
        }
        `;

    this.shadowRoot.appendChild(style);

    //bind
    this.handleLogin = this.handleLogin.bind(this);
    this.login = this.login.bind(this);
  }

  connectedCallback() {
    const formLogin = this.shadowRoot.querySelector("#form_login");
    formLogin.addEventListener("submit", this.handleLogin);
  }

  disconnectedCallback() {
    const formLogin = this.shadowRoot.querySelector("#form_login");
    console.log(formLogin);
    formLogin.removeEventListener("submit", this.handleLogin);
  }

  handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const user = formData.get("usuario");
    const password = formData.get("password");

    const loggedIn = this.login(user, password);

    if (loggedIn) {
      const loginEvent = new CustomEvent("login-success", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(loginEvent);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  login(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("username", username);
      return true;
    }

    return false;
  }
}

customElements.define("auth-login", AuthLogin);
