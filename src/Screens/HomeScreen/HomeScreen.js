import React, { useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import CategoriesBar from '../../Components/CategoriesBar/CategoriesBar'
import Video from '../../Components/Video/Video.js'
import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '../../api.js'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getVideosByCategory } from '../../Components/CategoriesBar/CategoriesBar.js'
import SkeletonVideo from '../../Components/Skeleton/SkeletonVideo.js'

export const getPopularVideos = createAsyncThunk(
  'homeVideos/getPopularVideos',
  async (_, { getState }) => {
    try {
      const category = 'All';
      const { data } = await request.get('/videos', {
        params: {
          part: 'snippet, contentDetails, statistics',
          chart: 'mostPopular',
          regionCode: 'IN',
          maxResults: 20,
          pageToken: getState().homeVideoReducer.nextPageToken,
        }
      });
      console.log(data);
      return {
        data: data,
        category: category,
      }
    }
    catch (error) {
      throw error;
    }
  }
)

const HomeScreen = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch])

  const { videos, activeCategory, loading } = useSelector((state) => state.homeVideoReducer)

  const fetchData = () => {
    if (activeCategory === 'All') {
      dispatch(getPopularVideos())
    }
    else {
      dispatch(getVideosByCategory(activeCategory))
    }
  }


  return (
    <Container>
      <CategoriesBar />

      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className='spinner-border text-danger d-block mx-auto'></div>
        }
        className='row'>
        {!loading
          ? videos.map(video => (
            <Col lg={3} md={4}>
              <Video video={video} key={video.id} />
            </Col>
          ))
          : [...Array(20)].map(() => (
            <Col lg={3} md={4}>
              <SkeletonVideo />
            </Col>
          ))}
      </InfiniteScroll>
    </Container>
  )
}

export default HomeScreen