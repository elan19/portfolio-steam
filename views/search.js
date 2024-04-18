export default class SearchView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                
                            </header>
                            <main class="main">
                                <search-list></search-list>
                            </main>
                            `;
    }
}
