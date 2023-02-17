import api from "./apiConfig";

const buildingAPI = {
    getBuildingAPI: () => {
        const url =`/web/buildings?page=${1}&size=${10}`;
        return api.get(url)
    },

}

export default buildingAPI