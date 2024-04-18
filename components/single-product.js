export default class SingleProduct extends HTMLElement {
    // component attributes
    static get observedAttributes() {
        return ['product'];
    }

    get product() {
        return JSON.parse(this.getAttribute('product'));
    }

    // connect component
    connectedCallback() {
        if (this.product.short_screenshots.length > 5) {
            this.innerHTML +=`
            <div class="both">
                <div class="right-top-div">
                    <p class="game-name">${this.product.name.replace(/"/g, "'")}</p>
                </div>
                <div class="left-div">
                    <img class="game-pic" src="${this.product.background_image}" 
                    alt="${this.product.name.replace(/"/g, "'")}">
                </div>
                <div class="right-div">
                    <img class="small-screenshot" 
                    src="${this.product.short_screenshots[1].image}" alt="small_screenshot 1">
                    <img class="small-screenshot" 
                    src="${this.product.short_screenshots[2].image}" alt="small_screenshot 2">
                    <img class="small-screenshot" 
                    src="${this.product.short_screenshots[3].image}" alt="small_screenshot 3">
                    <img class="small-screenshot" 
                    src="${this.product.short_screenshots[4].image}" alt="small_screenshot 4">
                </div>
            </div>`;
        } else if (this.product.short_screenshots.length > 2) {
            this.innerHTML +=`
            <div class="both">
                <div class="right-top-div">
                    <p class="game-name">${this.product.name.replace(/"/g, "'")}</p>
                </div>
                <div class="left-div">
                    <img class="game-pic" src="${this.product.background_image}" 
                    alt="${this.product.name.replace(/"/g, "'")}">
                </div>
                <div class="right-div-two-imgs">
                    <img class="small-screenshot" 
                    src="${this.product.short_screenshots[1].image}" alt="small_screenshot 0">
                    <img class="small-screenshot" 
                    src="${this.product.short_screenshots[2].image}" alt="small_screenshot 1">
                </div>
            </div>`;
        } else {
            this.innerHTML +=`
            <div class="both">
                <div class="right-top-div">
                    <p class="game-name">${this.product.name.replace(/"/g, "'")}</p>
                </div>
                <div class="left-div">
                    <img class="game-pic" src="${this.product.background_image}" 
                    alt="${this.product.name.replace(/"/g, "'")}">
                </div>
                <div class="right-div-one-img">
                    <img class="small-screenshot" 
                    src="${this.product.short_screenshots[0].image}" alt="small_screenshot 0">
                </div>
            </div>`;
        }

        // event listener on each game
        let games = this.querySelectorAll('.both');

        games.forEach((game) => {
            game.addEventListener('click', () => {
                window.location.hash = `game-info/${this.product.id}`;
            });
        });
    }
}
