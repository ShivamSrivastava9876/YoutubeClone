import { createSlice } from '@reduxjs/toolkit';
import { authUser } from '../Screens/LoginScreen/LoginScreen';

const initialState = {
    accessToken: sessionStorage.getItem("ytc-access-token") ? sessionStorage.getItem("ytc-access-token") : null,
    user: sessionStorage.getItem("ytc-user") ? JSON.parse(sessionStorage.getItem("ytc-user")) : null,
    loading: false,
    error: null
}

const authReducer = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        Login_Request: (state) => {
            state.loading = true;
        },
        Login_Success: (state, action) => {
            state.accessToken = action.payload;
            state.loading = false;
        },
        Login_Fail: (state, action) => {
            state.accessToken = null;
            state.loading = false;
            state.error = action.payload;
        },
        Load_Profile: (state, action) => {
            state.user = action.payload;
        },
        Log_Out: (state) => {
            state.accessToken = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(authUser.fulfilled, (state, action) => {
            // Add user to the state array
            // state.accessToken = action.payload.token;
        })
    }
})

export const { Login_Request, Login_Success, Login_Fail, Load_Profile, Log_Out } = authReducer.actions;
export default authReducer.reducer;