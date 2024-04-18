export default class PublisherInfoView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <a class="right backToRec" href="#">
                                    Tillbaka till rekommenderade spel
                                </a>
                            </header>
                            <main class="main">
                                <publisher-info></publisher-info>
                            </main>
                            `;
    }
}
