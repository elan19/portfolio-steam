import Router from "./router.js";

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.router = new Router();
    }

    // connect component
    connectedCallback() {
        const routes = this.router.routes;

        let navigationLinks = "";

        for (let path in routes) {
            if (routes[path].hidden) {
                continue;
            }
            navigationLinks += `<a class="nav-link" href='#${path}'>${routes[path].name}</a>`;
        }

        this.innerHTML = `<nav>
        <a href='#'><img class="nav-pic" src="./images/logo_steam.png" alt="steam_logo"></a>
        <div class="hamburg-menu">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        ${navigationLinks}
        </nav>`;

        const menu = document.querySelector(".hamburg-menu");

        menu.addEventListener('click', (event) => {
            event.preventDefault();
            const bar1 = document.querySelector(".bar1");
            const bar2 = document.querySelector(".bar2");
            const bar3 = document.querySelector(".bar3");
            const navLinks = document.querySelectorAll(".nav-link");

            bar1.classList.toggle("change-bar1");
            bar2.classList.toggle("change-bar2");
            bar3.classList.toggle("change-bar3");


            navLinks.forEach(navLink => {
                navLink.classList.toggle("nav-links-visible");
            });
        });
    }
}

const element = document.querySelector("#nav");

element.addEventListener('wheel', (event) => {
    event.preventDefault();
    element.scrollLeft += event.deltaY;
});
