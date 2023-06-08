import { createSlice} from '@reduxjs/toolkit';
import { getVideosByChannel } from '../Screens/ChannelScreen/ChannelScreen';

const channelVideosReducer = createSlice({
   name: 'channelVideos',
   initialState: {
      videos: [],
      loading: true,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getVideosByChannel.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getVideosByChannel.fulfilled, (state, action) => {
            state.videos = action.payload;
            state.loading = false;
            state.error = null;
         })
         .addCase(getVideosByChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         });
   },
});

export default channelVideosReducer.reducer;
