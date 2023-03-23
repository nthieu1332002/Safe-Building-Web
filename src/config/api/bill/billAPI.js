import api from "./apiConfig";

const billAPI = {
    getBillAPI: ({page, size }) => {
        const url = `/bills?page=${page}&size=${size}`;
        return api.get(url);
    },
    createBillAPI: (data) => {
        const url = `/bills`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    getBillByIdAPI: ({id}) => {
        const url =`/bills/${id}`;
        return api.get(url)
    },
    createMonthlyBillAPI: () => {
        const url =`/bills/create-bills`;
        return api.post(url)
    },
}

export default billAPI