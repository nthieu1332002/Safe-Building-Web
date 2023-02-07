import api from "./apiConfig";

// sample: 

const messageAPI = {
    addMessageAPI: (data) => {
        const url = `/api/message/addMsg`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    },
    addImageAPI: (data) => {
        const url = `/api/message/addImg`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    },
    getMessageAPI: (data) => {
        const url = `/api/message/getMsg`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    },
    seenMessageAPI: (data) => {
        const url = `/api/message/seenMsg`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    },
    getImageAPI: (data) => {
        const url = `/api/message/getImg`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    },
}

export default messageAPI