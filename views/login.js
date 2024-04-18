import authModel from "../models/auth.js";
export default class LoginView extends HTMLElement {
    // connect component
    connectedCallback() {
        if (authModel.token) {
            location.hash = "gemenskap";
        } else {
            this.render();
        }
    }

    render() {
        this.innerHTML =    `
        <main class="main-login">
            <login-form></login-form>
        </main>
        `;
    }
}
