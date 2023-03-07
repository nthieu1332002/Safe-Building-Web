import api from "./apiConfig";

const buildingAPI = {
    getBuildingFilterAPI: ({page, size, searchKey, sortBy, order }) => {
        const url = `/buildings/get-building-list?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        console.log("url", url);

        return api.get(url);
    },
    createBuildingAPI: (data) => {
        const url = `/buildings/add-building`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
}

export default buildingAPI