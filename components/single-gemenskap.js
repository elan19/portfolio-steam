export default class SingleGemenskap extends HTMLElement {
    // component attributes
    static get observedAttributes() {
        return ['gemenskap'];
    }

    get gemenskap() {
        return JSON.parse(this.getAttribute("gemenskap"));
    }

    // connect component
    async connectedCallback() {
        let date = new Date(this.gemenskap.datetimeUploaded);

        this.innerHTML += `
            <div class="gemenskap">
                <img src="${this.gemenskap.originalFileUrl} alt="picture">
                <div class="game-desc-h2-border"></div>
                <p>${date.toLocaleString()}</p>
            </div>
        `;
    }
}
