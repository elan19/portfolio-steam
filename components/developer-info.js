import { apiKey, baseURL } from "../utils.js";

export default class developerInfo extends HTMLElement {
    constructor() {
        super();

        this.developer = [];
        this.products = [];
    }

    async connectedCallback() {
        const route = location.hash.replace("#", "");
        const developerRegex = /^developer\/(\d+)/;
        const pageRegex = /page=(\d+)/;
        const match = route.match(developerRegex);
        const matchPage = route.match(pageRegex);

        if (match) {
            const id = match[1];

            if (matchPage) {
                const page = matchPage[1];
                const response = await
                fetch(`${baseURL}/games?developers=${id}&key=${apiKey}&page=${page}`);
                const result = await response.json();

                this.products = result.results;
                this.next = result.next;
                this.prev = result.previous;
            } else {
                const response = await fetch(`${baseURL}/games?developers=${id}&key=${apiKey}`);
                const result = await response.json();

                this.products = result.results;
                this.next = result.next;
                this.prev = result.previous;
            }

            const developerResponse = await fetch(`${baseURL}/developers/${id}?key=${apiKey}`);
            const developerResult = await developerResponse.json();

            this.developer = developerResult;

            this.render();
        }
    }

    render() {
        const list = this.products.filter((product) => product.background_image).map((product) => {
            return `<single-product product='${JSON.stringify(product).replace(/'/g, '\\"')}'>
                        </single-product>`;
        }).join("");

        this.innerHTML = `
            <h2 class='map-heading'>${this.developer.name}</h2>
            ${list}
            <button class="prev-page"><</button>
            <button class="next-page">></button>
        `;

        // Get the buttons
        const prevButton = document.querySelector('.prev-page');
        const nextButton = document.querySelector('.next-page');

        // Add event listener to the "prev-page" button
        prevButton.addEventListener('click', () => {
        // Add your logic for the "prev-page" button action here
            const regex = /page=(\d+)/;

            if (this.prev !== null ) {
                const matchTest = this.prev.match(regex);

                if (matchTest !== null ) {
                    const pageNumber = matchTest[1];

                    window.location.hash = `developer/${this.developer.id}/page=${pageNumber}`;
                } else {
                    window.location.hash = `developer/${this.developer.id}`;
                }
            }
        });

        // Add event listener to the "next-page" button
        nextButton.addEventListener('click', () => {
            const regex = /page=(\d+)/;

            if (this.next !== null) {
                const matchTest = this.next.match(regex);
                const pageNumber = matchTest[1];

                window.location.hash = `developer/${this.developer.id}/page=${pageNumber}`;
            } else {
                window.location.hash = `developer/${this.developer.id}`;
            }
        });
    }
}
