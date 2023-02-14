import api from "./apiConfig";

// sample: 

const buildingAPI = {
    getBuildingAPI: () => {
        const url =`/building?page=${1}&size=${10}`;
        return api.get(url)
    },

}

export default buildingAPI