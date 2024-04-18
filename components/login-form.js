import authModel from "../models/auth.js";

export default class LoginForm extends HTMLElement {
    constructor() {
        super();

        //this.products = [];
        this.login = {};
    }

    // connect component
    async connectedCallback() {
        //this.products = await productsModel.getProducts();

        this.render();
    }

    render() {
        this.innerHTML = `<h1 class="h1-logga-in">Login</h1>`;
        let form = document.createElement("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const user = {
                email: this.login.email,
                password: this.login.password,
            };

            const submitButtonValue = event.submitter.value;

            if (submitButtonValue === 'Logga in') {
                authModel.login(user.email, user.password);
            } else if (submitButtonValue === 'Registrera användare') {
                authModel.register(user.email, user.password);
            }
        });

        let emailInput = document.createElement("input");
        let passInput = document.createElement("input");

        emailInput.setAttribute("type", "email");
        emailInput.setAttribute("required", "required");
        emailInput.classList.add("input");

        passInput.setAttribute("type", "password");
        passInput.setAttribute("required", "required");
        passInput.classList.add("input");

        emailInput.addEventListener("input", (event) => {
            this.login = {
                ...this.login,
                email: event.target.value
            };
        });

        passInput.addEventListener("input", (event) => {
            this.login = {
                ...this.login,
                password: event.target.value
            };
        });

        let loginButton = document.createElement("input");
        let registrateButton = document.createElement("input");

        loginButton.setAttribute("type", "submit");
        loginButton.setAttribute("value", "Logga in");
        loginButton.setAttribute("name", "login");
        loginButton.classList.add("login-button", "button", "margin-bottom");

        registrateButton.setAttribute("type", "submit");
        registrateButton.setAttribute("value", "Registrera användare");
        registrateButton.setAttribute("name", "register");
        registrateButton.classList.add("button", "register-button", "margin-bottom");

        /*registrateButton.addEventListener("click", (event) => {
            event.preventDefault();

            if (this.login.email !== undefined && this.login.password !== undefined) {
                authModel.register(this.login.email, this.login.password);
            }
        });*/

        let passText = document.createElement("label");

        passText.textContent = "Lösenord";
        passText.classList.add("left");
        passText.classList.add("input-label");

        let emailText = document.createElement("label");

        emailText.textContent = "Email";
        emailText.classList.add("left");
        emailText.classList.add("input-label");

        form.appendChild(emailText);
        form.appendChild(emailInput);
        form.appendChild(passText);
        form.appendChild(passInput);
        form.appendChild(loginButton);
        form.appendChild(registrateButton);
        form.classList.add("login-form");
        this.appendChild(form);
    }
}
