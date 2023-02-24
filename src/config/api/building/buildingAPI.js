import api from "./apiConfig";

const buildingAPI = {
    getBuildingAPI: ({ page, size }) => {
        const url =`/buildings?page=${page}&size=${size}`;
        return api.get(url)
    },
    searchBuildingAPI: ({ page, size, name }) => {
        const url =`/buildings/find-building?page=${page}&size=${size}&name=${name}`;
        return api.get(url)
    },
}

export default buildingAPI