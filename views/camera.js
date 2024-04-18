export default class CameraViewer extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `
                            <main class="main">
                                <camera-component></camera-component>
                            </main>
                            `;
    }
}
