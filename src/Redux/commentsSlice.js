import { createSlice } from '@reduxjs/toolkit';
import { getCommentsOfVideosById } from '../Components/Comments/Comments';

const initialState = {
    loading: true,
    comments: null,
}

const getCommentsReducer = createSlice({
    name: "comments",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentsOfVideosById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCommentsOfVideosById.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload.items;
            })
            .addCase(getCommentsOfVideosById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

})

export default getCommentsReducer.reducer;