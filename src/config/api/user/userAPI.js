import api from "./apiConfig";

// sample: 

const userAPI = {
    loginAPI: (data) => {
        const url = `/admin/web/login?phone=${data.phone}&password=${data.password}`;

        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    loginWithGoogleAPI: (data) => {
        console.log(data);
        const url = `/admin/web/login-with-email?email=${data.email}`;
        const body = {
            ...data,
        }
        return api.post(url, body);
    }
    // registerAPI: (data) => {
    //     const url = `/api/auth/register`;

    //     const body = {
    //         ...data,
    //     };
    //     return api.post(url, body);
    // },
    // getAllUserAPI: ({id}) => {
    //     const url =`/api/auth/getAllUsers/${id}`;
    //     return api.get(url)
    // },
    // updateAvatar: (data) => {
    //     const url =`/api/auth/updateAvatar`;
    //     const body = {
    //         ...data,
    //     };
    //     return api.post(url, body);
    // }
}

export default userAPI