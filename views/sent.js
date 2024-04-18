export default class DeveloperView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Skickade Ordrar"></lager-title>
                            </header>
                            <main class="main">
                                <developer-list></developer-list>
                            </main>
                            `;
    }
}
