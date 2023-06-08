import { createSlice } from '@reduxjs/toolkit';
import { getSubscribedChannels } from '../Screens/SubscriptionsScreen/SubscriptionsScreen.js'

const initialState = {
    loading: true,
    videos: [],
}

const subscriptionsChannelReducer = createSlice({
    name: "channelDetails",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubscribedChannels.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSubscribedChannels.fulfilled, (state, action) => {
                state.videos = action.payload.items;
            })
            .addCase(getSubscribedChannels.rejected, (state, action) => {
                state.error = action.payload;
            })
    }

})

export default subscriptionsChannelReducer.reducer;