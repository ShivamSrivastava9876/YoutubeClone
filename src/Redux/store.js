import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js'
import videosReducer from './videosSlice.js'
import selectedVideoReducer from './selectedVideoSlice.js';
import channelDetailsReducer from './channelSlice.js';
import getCommentsReducer from './commentsSlice.js';
import relatedVideoReducer from './relatedVideoSlice.js'
import searchVideosReducer from './SearchVideoSlice.js'
import subscriptionsChannelReducer from './subscriptionsChannelReducer.js'
import getVideosByChannelReducer from './getVideosByChannelSlice.js';

const store = configureStore({
    reducer: {
        authentication: authReducer,
        homeVideoReducer: videosReducer,
        selectedVideo: selectedVideoReducer,
        channelDetails: channelDetailsReducer,
        getComments: getCommentsReducer,
        relatedVideos: relatedVideoReducer,
        searchVideos: searchVideosReducer,
        subscriptionsChannel: subscriptionsChannelReducer,
        getVideosByChannel: getVideosByChannelReducer,
    },
})

export default store;