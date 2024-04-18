import { apiKey, baseURL } from "../utils.js";

export default class publisherInfo extends HTMLElement {
    constructor() {
        super();

        this.publisher = [];
        this.products = [];
    }

    async connectedCallback() {
        const route = location.hash.replace("#", "");
        const publisherRegex = /^publisher\/(\d+)/;
        const pageRegex = /page=(\d+)/;
        const match = route.match(publisherRegex);
        const matchPage = route.match(pageRegex);

        if (match) {
            const id = match[1];

            if (matchPage) {
                const page = matchPage[1];
                const response = await
                fetch(`${baseURL}/games?publishers=${id}&key=${apiKey}&page=${page}`);
                const result = await response.json();

                this.products = result.results;
                this.next = result.next;
                this.prev = result.previous;
            } else {
                const response = await fetch(`${baseURL}/games?publishers=${id}&key=${apiKey}`);
                const result = await response.json();

                this.products = result.results;
                this.next = result.next;
                this.prev = result.previous;
            }

            const publisherResponse = await fetch(`${baseURL}/publishers/${id}?key=${apiKey}`);
            const publisherResult = await publisherResponse.json();

            this.publisher = publisherResult;
            this.render();
        }
    }

    render() {
        const list = this.products.filter((product) => product.background_image).map((product) => {
            return `<single-product product='${JSON.stringify(product).replace(/'/g, '\\"')}'>
                        </single-product>`;
        }).join("");

        this.innerHTML = `
            <h2 class='map-heading'>${this.publisher.name}</h2>
            <div class="publisher-desc">
                <p>${this.publisher.description}</p>
            </div>
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

                    window.location.hash = `publisher/${this.publisher.id}/page=${pageNumber}`;
                } else {
                    window.location.hash = `publisher/${this.publisher.id}`;
                }
            }
        });

        // Add event listener to the "next-page" button
        nextButton.addEventListener('click', () => {
            const regex = /page=(\d+)/;

            if (this.next !== null) {
                const matchTest = this.next.match(regex);
                const pageNumber = matchTest[1];

                window.location.hash = `publisher/${this.publisher.id}/page=${pageNumber}`;
            } else {
                window.location.hash = `publisher/${this.publisher.id}`;
            }
        });
    }
}
