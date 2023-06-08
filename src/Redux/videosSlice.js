import { createSlice } from '@reduxjs/toolkit';
import { getPopularVideos } from '../Screens/HomeScreen/HomeScreen';
import { getVideosByCategory } from '../Components/CategoriesBar/CategoriesBar.js';

const initialState = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: 'All',
    error: null
}

const videosReducer = createSlice({
    name: "homeVideos",
    initialState,
    reducers: {
        // Home_Videos_Success: (state, action) => {
        //     state.videos = action.payload;
        //     state.loading = false;
        // },
        // Home_Videos_Fail: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPopularVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPopularVideos.fulfilled, (state, action) => {
                state.videos = state.activeCategory===action.payload.category?[...state.videos,...action.payload.data.items]:action.payload.data.items;
                state.loading = false;
                state.nextPageToken = action.payload.data.nextPageToken;
                state.activeCategory = action.payload.category;
            })
            .addCase(getPopularVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(getVideosByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVideosByCategory.fulfilled, (state, action) => {
                state.videos = state.activeCategory===action.payload.category?[...state.videos,...action.payload.data.items]:action.payload.data.items;
                state.loading = false;
                state.nextPageToken = action.payload.data.nextPageToken;
                state.activeCategory = action.payload.category;
            })
            .addCase(getVideosByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    }
})

export default videosReducer.reducer;