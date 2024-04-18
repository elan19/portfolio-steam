import { listOfFiles, UploadcareSimpleAuthSchema } from "../uploadcare/index.rest.browser.min.js";

export default class GemenskapList extends HTMLElement {
    constructor() {
        super();

        this.gemenskaps = [];
    }

    // connect component
    async connectedCallback() {
        const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
            publicKey: '31b3ad2a10b6fe774677',
            secretKey: 'e08390074c24f5a322a4',
        });

        const result = await listOfFiles({}, { authSchema: uploadcareSimpleAuthSchema });

        this.gemenskaps = result.results;

        this.render();
    }

    render() {
        const list = this.gemenskaps.map((gemenskap) => {
            return `<single-gemenskap gemenskap='${JSON.stringify(gemenskap)}'>
                        </single-gemenskap>`;
        }).join("");

        this.innerHTML = `<h2 class="gemenskap-h2">Gemenskap</h2>
        <button class="pic-btn">Lägg till bild</button>
        ${list}`;

        const picButton = document.querySelector('.pic-btn');

        picButton.addEventListener('click', () => {
            window.location.hash = `camera`;
        });
    }
}
