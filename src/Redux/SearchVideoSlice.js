import { createSlice } from '@reduxjs/toolkit';
import { getVideosBySearch } from '../Screens/searchScreen.js';

const initialState = {
    videos: [],
    loading: true,
}

const searchVideosReducer = createSlice({
    name: "searchVideos",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideosBySearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVideosBySearch.fulfilled, (state, action) => {
                state.videos = action.payload.items;
                state.loading = false;
            })
            .addCase(getVideosBySearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    }
})

export default searchVideosReducer.reducer;