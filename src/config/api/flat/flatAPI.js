import api from "./apiConfig";

const flatAPI = {
    getFlatAPI: () => {
        const url =`/flats?page=${1}&size=${10}`;
        return api.get(url)
    },

}

export default flatAPI