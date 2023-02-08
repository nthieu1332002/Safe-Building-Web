import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: []
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        
    }
})

// export const getProfile = createAsyncThunk(
//     "user/getProfile",
//     async (uid) => {
//         const docRef = doc(db, "users", uid);
//         const res = await getDoc(docRef);
//         if (res.exists()) {
//             return res.data()
//         }
//         return {}
//     }
// );

// export const setProfile = createAsyncThunk(
//     "user/setProfile",
//     async (data) => {
//         const value = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             phone: data.phone,
//         }
//         try {
//             await setDoc(doc(db, "users", data.uid), value);
//             toast.success("Update your information successfully!", {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 className: "foo-bar",
//             });
//             return value
//         } catch (err) {
//             toast.error("Update your information failed!", {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 className: "foo-bar",
//             });
//             console.log(err);
//         }
//     }
// );

// export const { logIn, logOut } = userSlice.actions;
export default userSlice