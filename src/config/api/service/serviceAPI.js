import api from "./apiConfig";

// sample: 

const serviceAPI = {
    getServiceAPI: ({ page, size }) => {
        const url = `/services?page=${page}&size=${size}`;
        return api.get(url)
    }
}

export default serviceAPI