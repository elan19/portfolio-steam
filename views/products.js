export default class ProductsView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <label class="search-text">Sök efter spel eller produkt</label>
                                <div class="search">
                                    <form>
                                        <input class="search-bar" type="text" name="search">
                                        <input class="search-btn" type="submit" value="Sök">
                                    </form>
                                </div>
                            </header>
                            <main class="main">
                                <product-list></product-list>
                            </main>
                            `;
    }
}
