export default class AboutView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `
                            <main class="main-about">
                                <about-info></about-info>
                            </main>
                            `;
    }
}
