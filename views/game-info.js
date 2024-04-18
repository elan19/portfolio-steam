export default class GameInfoView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `
                            <main class="main">
                                <game-info></game-info>
                            </main>
                            `;
    }
}
