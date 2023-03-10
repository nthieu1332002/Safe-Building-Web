import api from "./apiConfig";

// sample: 

const contractAPI = {
    getContractAPI: ({ page, size }) => {
        const url =`/rent-contracts?page=${page}&size=${size}`;
        return api.get(url)
    },
    postContractAPI: (data) => {
        const url = `/rent-contracts/create-contract`;
        const body = {
            ...data
        }
        return api.post(url, body);
    },
    getContractByIdAPI: ({id}) => {
        const url =`/rent-contracts/${id}`;
        return api.get(url)
    },
    editContractAPI: (data) => {
        const url = `/rent-contracts/edit-contract`;
        const body = {
            ...data
        }
        return api.put(url, body);
    },
}

export default contractAPI