import api from "./apiConfig";

const residentAPI = {
    getResidentAPI: ({ page, size }) => {
        const url = `/web/customers?page=${page}&size=${size}`;
        return api.get(url)
    },
}

export default residentAPI