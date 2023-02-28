import api from "./apiConfig";

// sample: 

const contractAPI = {
    getCustomerAccountAPI: ({ page, size }) => {
        const url =`/customers?page=${page}&size=${size}`;
        return api.get(url)
    },
    getAdminAccountAPI: ({ page, size }) => {
        const url =`/admins/accounts?page=${page}&size=${size}`;
        return api.get(url)
    },
    createCustomerAccountAPI: (data) => {
        const url =`/customers/create-customer`;
        const body = {
            ...data,
        };

        return api.post(url, body);
    }
}

export default contractAPI