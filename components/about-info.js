export default class DeliveryList extends HTMLElement {
    constructor() {
        super();

        this.deliveries = [];
    }

    // connect component
    async connectedCallback() {
        //const response = await fetch(`${baseURL}/deliveries?api_key=${apiKey}`);
        //const result = await response.json();

        //this.deliveries = result.data;

        this.render();
    }

    render() {
        /*const list = this.deliveries.map((delivery) => {
            return `<single-delivery delivery='${JSON.stringify(delivery)}'>
                        </single-delivery>`;
        }).join("");*/

        this.innerHTML = `
        <div class="about-content">
            <div class="about-text">
                <p class="top-text-about">
                    Steam är den ultimata platsen för att spela, diskutera och skapa spel.
                </p>
                <button class="button install-steam-button">Installera steam</button>
            </div>
            <div class="about-img-div">
                <img class="about-img" 
                src="https://cdn.akamai.steamstatic.com/store/about/videos/about_hero_loop_web.png">
            </div>
        </div>
        <p class="middle-text">Läs mer</p>
        <p class="middle-text">&#8595;</p>
        <div class="about-content shop-info">
            <h1>Få tillgång till spel direkt</h1>
            <div class="about-text middle">
                <p>
                    Med nästan 30 000 spel från AAA till indie och allt däremellan. 
                    Njut av exklusiva erbjudanden, 
                    automatiska speluppdateringar och andra bra förmåner. 
                </p>
                <a class="about-link" href="#">Bläddra i butiken <span>&#8594;</span></a>
            </div>
        </div>
        <div class="about-content gemenskap-info">
            <div class="about-text left-about-gemenskap">
                <h1>Gå med i gemenskapen</h1>
                <p>
                    Träffa nya vänner, 
                    titta på andras bilder och lägg upp dina bilder på gemenskapen! 
                    Med över 100 miljoner potentiella vänner (och fiender) 
                    tar det roliga aldrig slut. 
                </p>
                <a class="about-link" href="#gemenskap">Besök gemenskapen <span>&#8594;</span></a>
            </div>
            <div class="about-img-div right-about-gemenskap">
                <img class="about-img" src="./images/about-gemenskap2.png">
            </div>
        </div>`;
    }
}
