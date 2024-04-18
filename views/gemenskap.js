import authModel from "../models/auth.js";

export default class GemenskapView extends HTMLElement {
    // connect component
    connectedCallback() {
        if (!authModel.token) {
            location.hash = "login";
        } else {
            this.render();
        }
    }

    render() {
        this.innerHTML =    `
                            <main class="main">
                                <gemenskap-list></gemenskap-list>
                            </main>
                            `;
    }
}
