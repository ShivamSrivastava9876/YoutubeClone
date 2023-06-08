import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase.js';
import { Login_Request, Login_Success, Login_Fail, Load_Profile } from '../../Redux/authSlice.js';
import { useNavigate } from 'react-router-dom';

import './loginScreen.scss'

export const authUser = createAsyncThunk(
    'authentication/requestStatus',
    async (_, { dispatch }) => {
        const provider = await new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
        return (
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    const profile = {
                        name: user.displayName,
                        photoURL: user.photoURL
                    }
                    dispatch(Login_Success(token));
                    dispatch(Load_Profile(profile));

                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    dispatch(Login_Fail(errorMessage));
                })
        )
    }
)

const LoginScreen = () => {

    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.authentication.accessToken);
    const user = useSelector((state) => state.authentication.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate('/');
        }
    }, [accessToken, navigate]);

    const handleLogin = async () => {
        dispatch(Login_Request());
        dispatch(authUser());

        sessionStorage.setItem("ytc-access-token", accessToken);
        sessionStorage.setItem("ytc-user", JSON.stringify(user));
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <h2>Youtube Clone</h2>
                <img
                    src='http://pngimg.com/uploads/youtube/youtube_PNG2.png'
                    alt=''
                />
                <button onClick={handleLogin}><b>Login with Google</b></button>
                <p>This Project is made using YOUTUBE DATA API</p>
            </div>
        </div>
    )
}

export default LoginScreen;