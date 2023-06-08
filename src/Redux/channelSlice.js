import { createSlice } from '@reduxjs/toolkit';
import { checkSubscriptionStatus, getChannelDetails } from '../Screens/WatchScreen/WatchScreen';

const initialState = {
    loading: true,
    channel: {},
    subscriptionStatus: false,
}

const channelDetailsReducer = createSlice({
    name: "channelDetails",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannelDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getChannelDetails.fulfilled, (state, action) => {
                state.channel = action.payload.items[0];
                state.loading = false;
            })
            .addCase(getChannelDetails.rejected, (state, action) => {
                state.channel = null;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
                state.subscriptionStatus = action.payload;
            })
            .addCase(checkSubscriptionStatus.rejected, (state, action) => {
                state.error = action.payload;
            })
    }

})

export default channelDetailsReducer.reducer;