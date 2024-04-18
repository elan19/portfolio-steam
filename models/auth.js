import { lagerKey, lagerBaseURL } from "../utils.js";

const auth = {
    token: "",

    login: async function login(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: lagerKey
        };

        const response = await fetch(`${lagerBaseURL}/auth/login`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        if (result.data == undefined) {
            alert("Wrong email or password, try again.");
            return "not ok";
        }

        if (result.data.type === "success") {
            auth.token = result.data.token;
            location.hash = "gemenskap";
            return "ok";
        }

        return "not ok";
    },

    register: async function register(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: lagerKey
        };

        const response = await fetch(`${lagerBaseURL}/auth/register`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        if (result.data == undefined) {
            alert("Something went wrong, check email and password, try log in or try again.");
            return "not ok";
        }

        if (result.data.message === "User successfully registered.") {
            alert("Registation completed!");
            return "ok";
        }

        return "not ok";
    },
};

export default auth;
