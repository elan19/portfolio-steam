export default class Footer extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML = `
        <div class="footer">
            <div class="footer-content">
                <img class="footer-pic" src='images/valve.png' alt='valve corp.'>
                <img class="footer-pic right" src="images/logo_steam.png" alt="steam_logo">
                <p>
                    © 2023 Valve Corporation. Alla rättigheter förbehållna. 
                    Alla varumärken tillhör respektive ägare i USA och andra länder.
                </p>
            </div>
            <a class="footer-link" href="https://www.valvesoftware.com/sv/about">Om Valve</a> |
            <a class="footer-link" href="https://www.valvesoftware.com/sv/">Jobb</a> |
            <a class="footer-link" href="https://partner.steamgames.com/">Steamworks</a> |
            <a class="footer-link" href="#">Support</a> |
            <a class="footer-link" href="https://www.facebook.com/Steam">Facebook</a> |
            <a class="footer-link" href="https://twitter.com/steam">Twitter</a> |
            <a class="footer-link" href="https://store.steampowered.com/">Steam website</a>
        </div>`;
    }
}
