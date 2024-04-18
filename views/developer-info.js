export default class DeveloperInfoView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <a class="right backToRec" href="#">
                                    Tillbaka till rekommenderade spel
                                </a>
                            </header>
                            <main class="main">
                                <developer-info></developer-info>
                            </main>
                            `;
    }
}
