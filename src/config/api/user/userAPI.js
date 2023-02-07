import api from "./apiConfig";


// sample: 

const userAPI = {
    loginAPI: (data) => {
        const url = `/api/auth/login`;

        const body = {
            ...data,
        };

        return api.post(url, body);
    },
    registerAPI: (data) => {
        const url = `/api/auth/register`;

        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    getAllUserAPI: ({id}) => {
        const url =`/api/auth/getAllUsers/${id}`;
        return api.get(url)
    },
    updateAvatar: (data) => {
        const url =`/api/auth/updateAvatar`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    }
}

export default userAPI