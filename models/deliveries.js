import { apiKey, baseURL } from "../utils.js";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${baseURL}/deliveries?api_key=${apiKey}`);
        const result = await response.json();

        return result.data;
    },

    updateDeliveries: async function updateDeliveries(deliveryObject) {
        const updated = {
            ...deliveryObject,
            api_key: apiKey
        };

        fetch(`${baseURL}/deliveries`, {
            body: JSON.stringify(updated),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
    }
};

export default deliveries;
