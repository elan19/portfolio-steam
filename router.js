export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<products-view></products-view>",
                name: "Butik",
            },
            "gemenskap": {
                view: "<gemenskap-view></gemenskap-view>",
                name: "Gemenskap",
            },
            "about": {
                view: "<about-view></about-view>",
                name: "Om",
            },
            "login": {
                view: "<login-view></login-view>",
                name: "Login",
            },
            "developer/:id": {
                view: "<developer-info-view></developer-info-view>",
                name: "Developer Info",
                hidden: true
            },
            "publisher/:id": {
                view: "<publisher-info-view></publisher-info-view>",
                name: "Publisher Info",
                hidden: true
            },
            "game-info/:id": {
                view: "<game-info-view></game-info-view>",
                name: "Game Info",
                hidden: true
            },
            "search/:id": {
                view: "<search-view></search-view>",
                name: "Search",
                hidden: true
            },
            "camera": {
                view: "<camera-view></camera-view>",
                name: "Kamera",
                hidden: true
            }
        };
    }

    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute();
        });

        this.resolveRoute();
    }

    resolveRoute() {
        this.currentRoute = location.hash.replace("#", "");

        const gameInfoRegex = /^game-info\/(.*)$/;
        const gameInfoMatch = this.currentRoute.match(gameInfoRegex);
        const pageRegex = /page=(\d+)/;
        const pageMatch = this.currentRoute.match(pageRegex);
        const developerRegex = /^developer\/(.*)$/;
        const developerMatch = this.currentRoute.match(developerRegex);
        const publisherRegex = /^publisher\/(.*)$/;
        const publisherMatch = this.currentRoute.match(publisherRegex);
        const searchRegex = /^search\/(.*)$/;
        const searchMatch = this.currentRoute.match(searchRegex);

        if (gameInfoMatch) {
            const orderId = gameInfoMatch[1];
            const gameInfoComponent = document.createElement("game-info-view");

            gameInfoComponent.setAttribute("order-id", orderId);
            this.innerHTML = "";
            this.appendChild(gameInfoComponent);
        } else if (developerMatch) {
            const orderId = developerMatch[1];
            const developerComponent = document.createElement("developer-info-view");

            developerComponent.setAttribute("order-id", orderId);
            this.innerHTML = "";
            this.appendChild(developerComponent);
        } else if (publisherMatch) {
            const orderId = publisherMatch[1];
            const publisherComponent = document.createElement("publisher-info-view");

            publisherComponent.setAttribute("order-id", orderId);
            this.innerHTML = "";
            this.appendChild(publisherComponent);
        } else if (searchMatch) {
            const searchComponent = document.createElement("search-view");

            this.innerHTML = "";
            this.appendChild(searchComponent);
        } else if (pageMatch) {
            const gameComponent = document.createElement("products-view");

            this.innerHTML = "";
            this.appendChild(gameComponent);
        } else {
            this.render();
        }
    }

    render() {
        //this.innerHTML = this.routes[this.currentRoute].view || "<not-found></not-found>";

        const route = this.routes[this.currentRoute];
        const view = route.view || "<not-found></not-found>";

        const element = document.querySelector("#nav");

        // Add the router-enter class to the router element
        this.classList.add("router-enter");
        element.classList.add("router-enter-nav");

        // Delay the rendering until the transition has ended
        setTimeout(() => {
            this.innerHTML = view;
            this.classList.remove("router-enter");
            element.classList.remove("router-enter-nav");
        }, 500);
    }
}
