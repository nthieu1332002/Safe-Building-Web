import api from "./apiConfig";

const buildingAPI = {
    getBuildingAPI: (data) => {
        const url = `/buildings/get-building-list`;
        const body = {
            ...data,
        };

        return api.post(url, body);
    },
}

export default buildingAPI