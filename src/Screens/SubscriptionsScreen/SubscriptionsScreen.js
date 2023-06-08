import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import VideoHorizontal from '../../Components/VideoHorizontal/VideoHorizontal'
import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '../../api'

export const getSubscribedChannels = createAsyncThunk(
   'channel/getSubscribedChannels',
   async (_, { getState }) => {
      try {
         const { data } = await request.get('/subscriptions', {
            params: {
               part: 'snippet, contentDetails',
               mine: true,
            },
            headers: {
               Authorization: `Bearer ${getState().authentication.accessToken}`,
            }
         })
         console.log(data)
         return data
      }
      catch (error) {
         console.log(error.message)
         throw error
      }
   }
)

const SubscriptionsScreen = () => {

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getSubscribedChannels())
   }, [dispatch])

   const { loading, videos } = useSelector(state => state.subscriptionsChannel)

   return (
      <Container fluid>
         {!loading ? (
            videos?.map(video => (
               <VideoHorizontal video={video} key={video.id} subScreen />
            ))
         ) : (
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
               <Skeleton width='100%' height='160px' count={20} />
            </SkeletonTheme>
         )}
      </Container>
   )
}

export default SubscriptionsScreen