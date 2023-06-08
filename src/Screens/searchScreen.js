import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import VideoHorizontal from '../Components/VideoHorizontal/VideoHorizontal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '../api'

export const getVideosBySearch = createAsyncThunk(
    'Videos/getVideosBySearch',
    async (query) => {
        try {
            const { data } = await request.get('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    q: query,
                    type: 'video, channel'
                }
            })
            console.log(data);
            return data
        }
        catch (error) {
            throw error;
        }
    }
)

const SearchScreen = () => {
   const { query } = useParams()

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getVideosBySearch(query))
   }, [query, dispatch])

   const { videos, loading } = useSelector(state => state.searchVideos)

   return (
      <Container>
         {!loading ? (
            videos?.map(video => (
               <VideoHorizontal
                  video={video}
                  key={video.id.videoId}
                  SearchScreen
               />
            ))
         ) : (
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
               <Skeleton width='100%' height='160px' count={20} />
            </SkeletonTheme>
         )}
      </Container>
   )
}

export default SearchScreen