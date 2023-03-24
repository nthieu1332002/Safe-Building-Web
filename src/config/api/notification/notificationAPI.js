import api from "./apiConfig";

const notificationAPI = {
    sendNotificationAPI: (data) => {
        const url = `/notification`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
}

export default notificationAPI