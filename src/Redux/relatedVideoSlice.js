import { createSlice } from '@reduxjs/toolkit';
import { getRelatedVideos } from '../Screens/WatchScreen/WatchScreen.js'

const initialState = {
    loading: true,
    videos: [],
}

const relatedVideoReducer = createSlice({
    name: "relatedVideo",
    initialState,
    reducers: {
        //No Reducers
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRelatedVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRelatedVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videos = action.payload.items;
            })
            .addCase(getRelatedVideos.rejected, (state, action) => {
                state.loading = false;
                state.videos = null;
                state.error = action.payload;
            })
    }
})

export default relatedVideoReducer.reducer;