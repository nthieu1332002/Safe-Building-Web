import api from "./apiConfig";

const residentAPI = {
    getResidentAPI: ({ page, size }) => {
        const url = `/customer?page=${page}&size=${size}`;
        return api.get(url)
    },
}

export default residentAPI