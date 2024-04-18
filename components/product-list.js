import { apiKey, baseURL } from "../utils.js";

export default class ProductList extends HTMLElement {
    constructor() {
        super();

        this.products = [];
    }

    // connect component
    async connectedCallback() {
        const route = location.hash.replace("#", "");
        const gameInfoRegex = /page=(\d+)/;
        const match = route.match(gameInfoRegex);

        if (match) {
            const id = match[1];
            const response = await fetch(`${baseURL}/games?key=${apiKey}&page=${id}`);
            const result = await response.json();

            this.products = result.results;
            this.next = result.next;
            this.prev = result.previous;
        } else {
            const response = await fetch(`${baseURL}/games?key=${apiKey}`);
            const result = await response.json();

            this.products = result.results;
            this.next = result.next;
            this.prev = result.previous;
        }

        this.render();
    }

    render() {
        const list = this.products.map((product) => {
            return `<single-product product='${JSON.stringify(product).replace(/'/g, '\\"')}'>
                        </single-product>`;
        }).join("");

        this.innerHTML = `
        <h3 class="game-list-h3">Utvalda och rekommenderas</h3>
        ${list}
        <button class="prev-page"><</button>
        <button class="next-page">></button>`;

        document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            var searchQuery = document.querySelector('input[type="text"]').value;

            window.location.hash = `search/${searchQuery}`;
        });

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

                    window.location.hash = `page=${pageNumber}`;
                } else {
                    window.location.hash = `#`;
                }
            }
        });

        // Add event listener to the "next-page" button
        nextButton.addEventListener('click', () => {
            const regex = /page=(\d+)/;
            const matchTest = this.next.match(regex);
            const pageNumber = matchTest[1];

            window.location.hash = `page=${pageNumber}`;
        });
    }
}
