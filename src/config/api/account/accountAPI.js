import api from "./apiConfig";

// sample: 

const contractAPI = {
    getCustomerAccountAPI: ({ page, size }) => {
        const url =`/customers/accounts?page=${page}&size=${size}`;
        return api.get(url)
    },
    getAdminAccountAPI: ({ page, size }) => {
        const url =`/admins/accounts?page=${page}&size=${size}`;
        return api.get(url)
    },
}

export default contractAPI