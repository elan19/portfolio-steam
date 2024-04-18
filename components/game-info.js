import { apiKey, baseURL } from "../utils.js";
import authModel from "../models/auth.js";

export default class gameInfo extends HTMLElement {
    constructor() {
        super();

        this.game = [];
    }

    async connectedCallback() {
        const route = location.hash.replace("#", "");
        const gameInfoRegex = /^game-info\/(.*)$/;
        const match = route.match(gameInfoRegex);

        if (match) {
            const id = match[1];

            const response = await fetch(`${baseURL}/games/${id}?key=${apiKey}`);
            const result = await response.json();

            this.game = result;
        }

        let platforms = "";
        let genres = "";
        let reqMin = "";
        let reqRec = "";
        let publishers = [];
        let ratingCount = 0;
        let ratingPercent = 0;

        if (this.game.ratings[0]) {
            if (this.game.ratings[0].count) {
                ratingCount = this.game.ratings[0].count;
            }
            if (this.game.ratings[0].percent) {
                ratingPercent = this.game.ratings[0].percent;
            }
        }

        for (let i = 0; i < this.game.platforms.length; i++) {
            platforms += this.game.platforms[i].platform.name + " | ";
            if (this.game.platforms[i].platform.name == "PC") {
                if (this.game.platforms[i].requirements.minimum) {
                    reqMin = this.game.platforms[i].requirements.minimum;
                } else {
                    reqMin = "Minumum:\nUnknown";
                }
                if (this.game.platforms[i].requirements.recommended) {
                    reqRec = this.game.platforms[i].requirements.recommended;
                } else {
                    reqRec = "Recommended:\nSame as Minimum";
                }
            } else {
                reqMin = "Minumum:\nUnknown";
                reqRec = "Recommended:\nSame as Minimum";
            }
        }

        for (let i = 0; i < this.game.genres.length; i++) {
            genres += this.game.genres[i].name + ", ";
        }

        for (let i = 0; i < this.game.publishers.length; i++) {
            publishers.push(this.game.publishers[i].name);
        }

        genres = genres.slice(0, genres.length-2);
        platforms = platforms.slice(0, platforms.length-2);
        const publishersHTML = this.game.publishers.map(publisher => `
        <a href="#publisher/${publisher.id}">${publisher.name}</a>`).join(", ");

        this.innerHTML = `
            <h2 class='map-heading'>${this.game.name}</h2>
            <div class='both no-cursor game-info-height'>
                <div class="left-div no-margin-left">
                    <img class="game-info-pic border" src="${this.game.background_image}">
                </div>
                <div class="right-div-info">
                    <img class="right-div-info-img" src="${this.game.background_image_additional}">
                    <p>Genomsnittlig recension: <span>${this.game.rating} av 5</span></p>
                    <p>Topp recensioner: <span>${ratingCount} (${ratingPercent}%)</span></p>
                    <p>Antal recensioner: <span>${this.game.ratings_count}</span></p>
                    <br>
                    <p>Utgivningsdatum: <span>${this.game.released}</span></p>
                    <br>
                    <p>Utvecklare: 
                    <a href="#developer/${this.game.developers[0].id}">
                        ${this.game.developers[0].name}
                    </a></p>
                    <p>Utgivare: ${publishersHTML}</p>
                </div>
            </div>
            <div class="game-body">
                <div class="buy-game">
                    <h2>Köp ${this.game.name}</h2>
                    <p>${platforms}</p>
                    <div class="purchase">
                        <div class="game-cost">
                            <p>9,99€</p>
                        </div>
                        <button class="buy-game-btn">Köp</button>
                    </div>
                </div>
                <div class="recommended">
                    <h2>Rekommenderat spel</h2>
                    <p>
                        Från dina tidigare spel ser detta ut att vara ett spel du skulle tycka om.
                    </p>
                </div>
                <div class="game-desc">
                    <h2>Om detta spel</h2>
                    <div class="game-desc-h2-border">
                    </div>
                    <p>${this.game.description_raw}</p>
                </div>
                <div class="game-links">
                    <p>Titel: <span>${this.game.name}</span></p>
                    <p>Genre: <span>${genres}</span></p>
                    <p>Utvecklare: 
                    <a href="#developer/${this.game.developers[0].id}">
                        ${this.game.developers[0].name}
                    </a></p>
                    <p>Utgivare: ${publishersHTML}</p>
                    <p>Utgivningsdatum: <span>${this.game.released}</span></p>
                    <div class="all-links">
                        <a class="link" href="${this.game.website}">Gå till webbplatsen</a>
                        <a class="link" 
                        href="https://www.twitch.tv/directory/game/${this.game.name}">
                        Länk till twitch</a>
                        <a class="link" 
                        href="https://www.youtube.com/results?search_query=${this.game.name}">
                        Sök på Youtube</a>
                    </div>
                </div>
                <div class="game-req">
                    <h2>Systemkrav: </h2>
                    <div class="game-desc-h2-border">
                    <div class="req-min">
                        <pre>${reqMin}</pre>
                    </div>
                    <div class="req-rec">
                        <pre>${reqRec}</pre>
                    </div>
                </div>
            </div>`;

        const buyButton = document.querySelector('.buy-game-btn');

        // Add event listener to the "prev-page" button
        buyButton.addEventListener('click', () => {
        // Add your logic for the "prev-page" button action here
            if (!authModel.token) {
                alert("You need to login first.");
                location.hash = "login";
            } else {
                alert("Du köpte spelet.");
                buyButton.style.display = "none";
            }
        });
    }
}
