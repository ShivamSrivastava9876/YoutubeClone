import { createSlice } from '@reduxjs/toolkit';
import { getVideoById } from '../Screens/WatchScreen/WatchScreen';

const initialState = {
    loading: true,
    video: null,
}

const selectedVideoReducer = createSlice({
    name: "selectedVideo",
    initialState,
    reducers: {
        //No Reducers
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideoById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getVideoById.fulfilled, (state, action) => {
                state.loading = false;
                state.video = action.payload.items[0];
            })
            .addCase(getVideoById.rejected, (state, action) => {
                state.loading = false;
                state.video = null;
                state.error = action.payload;
            })
    }
})

export default selectedVideoReducer.reducer;