import axios from "axios";


const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key: "AIzaSyA-y48Wod8aL7jl1DA9BzRjgVv0OKgwL5I"
    }
})

export default request;