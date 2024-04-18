import { apiKey, baseURL } from "../utils.js";

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${baseURL}/products?api_key=${apiKey}`);
        const result = await response.json();

        return result.data;
    },

    updateProducts: async function updateProducts(productObject) {
        const updated = {
            ...productObject,
            api_key: apiKey
        };

        fetch(`${baseURL}/products`, {
            body: JSON.stringify(updated),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        }).then(() => {
            window.location.reload();
        });
    }
};

export default products;
