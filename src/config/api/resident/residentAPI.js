import api from "./apiConfig";

const residentAPI = {
    getResidentAPI: ({ page, size }) => {
        const url = `/customers?page=${page}&size=${size}`;
        return api.get(url)
    },
    createResidentAccountAPI: (data) => {
        const url = `/customers/create-customer`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    getResidentAccountByIdAPI: ({id}) => {
        const url = `/customers/${id}`;
        return api.get(url)
    }
}

export default residentAPI