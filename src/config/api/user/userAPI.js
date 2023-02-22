import api from "./apiConfig";

// sample: 

const userAPI = {
    loginAPI: (data) => {
        const url = `/auth/web/login`;

        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    loginWithGoogleAPI: (data) => {
        const url = `/auth/web/login-with-email`;
        const body = {
            ...data,
        }
        return api.post(url, body);
    }
}

export default userAPI