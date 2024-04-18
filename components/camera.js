import { UploadClient } from "../uploadcare/index.browser.min.js";

import { apiKey, baseURL } from "../utils.js";

export default class CameraComponent extends HTMLElement {
    constructor() {
        super();

        this.photoData = "";
        this.order = [];
    }

    async connectedCallback() {
        this.innerHTML = `
        <div class="camera">
            <h2 class="camera-heading">Take photo - add photo</h2>
            <div class="video-canvas">
                <video class="border" id="video">Video stream not available.</video>
                <button class="button pictureBtn" id="startbutton">Take photo</button>
            </div>
            <div class="camera-buttons">
                <canvas class="hidden border" id="canvas"></canvas>
                <button class="button pictureBtn cameraBtn-Bottom hidden" id="sendbutton">
                    Send photo
                </button>
            </div>
        </div>
        `;

        /*window.addEventListener("load", () => {
        }, false);*/
        this.startup();
    }

    async sendpicture() {
        const blob = await (await fetch(this.photoData)).blob();

        const client = new UploadClient({ publicKey: '31b3ad2a10b6fe774677' });

        const fileInfo = await client.uploadFile(blob);
        const cdnUrl = fileInfo.cdnUrl;

        console.log(cdnUrl);
        window.location.hash = `gemenskap`;
    }

    async takepicture(canvas, video, width, height) {
        const context = canvas.getContext("2d");

        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            this.photoData = canvas.toDataURL("image/png");
        } else {
            this.clearphoto(canvas);
        }
    }

    async clearphoto(canvas) {
        const context = canvas.getContext("2d");

        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.photoData = canvas.toDataURL("image/png");
    }

    async startup() {
        let streaming = false;
        const width = 300; // We will scale the photo width to this
        let height = 0; // This will be computed based on the input stream

        let video = document.getElementById("video");
        let canvas = document.getElementById("canvas");
        let startbutton = document.getElementById("startbutton");
        let sendbutton = document.getElementById("sendbutton");

        const route = location.hash.replace("#", "");
        const orderInfoRegex = /^karta\/(.*)$/;
        const match = route.match(orderInfoRegex);

        if (match) {
            const id = match[1];

            const response = await fetch(`${baseURL}/orders/${id}?api_key=${apiKey}`);
            const result = await response.json();

            this.order = result.data;
        }

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
            });

        video.addEventListener(
            "canplay",
            () => {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    streaming = true;
                }
            },
            false
        );

        startbutton.addEventListener(
            "click",
            (ev) => {
                ev.preventDefault();
                this.takepicture(canvas, video, width, height);
                canvas.classList.remove("hidden");
                sendbutton.classList.remove("hidden");
            },
            false
        );

        sendbutton.addEventListener(
            "click",
            (ev) => {
                ev.preventDefault();
                this.sendpicture();
            },
            false
        );

        this.clearphoto(canvas);
    }
}
