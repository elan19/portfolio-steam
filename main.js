// router import
import Router from "./router.js";
import Navigation from "./navigation.js";
import Footer from "./footer.js";

// view import
import ProductsView from "./views/products.js";
import GemenskapView from "./views/gemenskap.js";
import AboutView from "./views/about.js";
import LoginView from "./views/login.js";
import DeveloperView from "./views/sent.js";
import GameInfoView from "./views/game-info.js";
import DeveloperInfoView from "./views/developer-info.js";
import PublisherInfoView from "./views/publisher-info.js";
import SearchView from "./views/search.js";

// component imports
import LagerTitle from "./components/lager-title.js";
import ProductList from "./components/product-list.js";
import SingleProduct from "./components/single-product.js";
import GemenskapList from "./components/gemenskap-list.js";
import SingleGemenskap from "./components/single-gemenskap.js";
import AboutInfo from "./components/about-info.js";
import LoginForm from "./components/login-form.js";
import CameraComponent from "./components/camera.js";
import GameInfo from "./components/game-info.js";
import DeveloperInfo from "./components/developer-info.js";
import PublisherInfo from "./components/publisher-info.js";
import SearchList from "./components/search-list.js";
import CameraViewer from "./views/camera.js";

customElements.define('router-outlet', Router);
customElements.define('navigation-outlet', Navigation);
customElements.define('footer-outlet', Footer);

customElements.define('products-view', ProductsView);
customElements.define('about-view', AboutView);
customElements.define('login-view', LoginView);
customElements.define('developer-view', DeveloperView);
customElements.define('game-info-view', GameInfoView);
customElements.define('developer-info-view', DeveloperInfoView);
customElements.define('publisher-info-view', PublisherInfoView);
customElements.define('search-view', SearchView);
customElements.define('gemenskap-view', GemenskapView);
customElements.define('camera-view', CameraViewer);

customElements.define('lager-title', LagerTitle);
customElements.define('product-list', ProductList);
customElements.define('single-product', SingleProduct);
customElements.define('gemenskap-list', GemenskapList);
customElements.define('single-gemenskap', SingleGemenskap);
customElements.define('about-info', AboutInfo);
customElements.define('login-form', LoginForm);
customElements.define("camera-component", CameraComponent);
customElements.define('game-info', GameInfo);
customElements.define('developer-info', DeveloperInfo);
customElements.define('publisher-info', PublisherInfo);
customElements.define('search-list', SearchList);
