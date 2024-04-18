import { apiKey, baseURL } from "../utils.js";
import authModel from "../models/auth.js";

const invoices = {
    getInvoices: async function getInvoices() {
        const response = await fetch(`${baseURL}/invoices?api_key=${apiKey}`, {
            headers: {
                'x-access-token': authModel.token,
            },
        });
        const result = await response.json();

        return result.data;
    },
};

export default invoices;
