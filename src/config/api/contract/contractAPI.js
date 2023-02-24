import api from "./apiConfig";

// sample: 

const contractAPI = {
    getContractAPI: ({ page, size }) => {
        const url =`/rent-contracts?page=${page}&size=${size}`;
        return api.get(url)
    },
    postContractAPI: (data) => {
        const url = `/file-upload`;
        const body = {
            ...data
        }
        return api.post(url, body);
    }
}

export default contractAPI