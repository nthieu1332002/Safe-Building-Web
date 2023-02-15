import api from "./apiConfig";

// sample: 

const contractAPI = {
    getContractAPI: () => {
        const url =`/contract?page=${1}&size=${10}`;
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