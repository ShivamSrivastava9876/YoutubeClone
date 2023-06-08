import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Comments from '../../Components/Comments/Comments.js'
import VideoHorizontal from '../../Components/VideoHorizontal/VideoHorizontal.js'
import VideoMetaData from '../../Components/VideoMetaData/VideoMetaData.js'
import './watchScreen.scss'
import { useParams } from 'react-router-dom'
import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '../../api.js'
import { useDispatch, useSelector } from 'react-redux'

export const getVideoById = createAsyncThunk(
    'videoDetails/getVideoById',
    async (id) => {
        try {
            const { data } = await request.get('/videos', {
                params: {
                    part: 'snippet, statistics',
                    id: id,
                }
            });
            console.log(data);
            return data;

        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
)

export const getChannelDetails = createAsyncThunk(
    'videoDetails/getChannelDetails',
    async (id) => {
        try {
            const { data } = await request.get('/channels', {
                params: {
                    part: 'snippet, statistics, contentDetails',
                    id: id,
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

export const checkSubscriptionStatus = createAsyncThunk(
    'channel/setSubscriptionStatus',
    async (id, { getState }) => {
        try {
            const { data } = await request.get('/subscriptions', {
                params: {
                    part: 'snippet',
                    forChannelId: id,
                    mine: true,
                },
                headers: {
                    Authorization: `Bearer ${getState().authentication.accessToken}`,
                }
            })
            console.log(data)
            return data.items.length !== 0;
        }
        catch (error) {
            console.log(error.message)
            throw error
        }
    }
)

export const getRelatedVideos = createAsyncThunk(
    'videoDetails/getRelatedVideos',
    async (id) => {
        try {
            const { data } = await request.get('/search', {
                params: {
                    part: 'snippet',
                    relatedToVideoId: id,
                    maxResults: 15,
                    type: 'video',
                }
            });
            console.log(data);
            return data;

        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
)

const WatchScreen = () => {

    const { id } = useParams()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getRelatedVideos(id))

    }, [dispatch, id])

    const { videos, loading: relatedVideosLoading } = useSelector((state) => state.relatedVideos)

    const { video, loading } = useSelector((state) => state.selectedVideo)

    return (
        <Row>
            <Col lg={8}>
                <div className='watchScreen__player'>
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder='0'
                        title={video?.snippet?.title}
                        allowFullScreen
                        width='100%'
                        height='100%'></iframe>
                </div>
                {!loading ? (
                    <VideoMetaData video={video} videoId={id} />
                ) : (
                    <h6> loading </h6>
                )}

                <Comments videoId={id} totalComments={video?.statistics?.commentCount}/>
            </Col>
            <Col lg={4}>
                {!loading && videos?.filter(video => video.snippet).map((video) => (
                    <VideoHorizontal video={video} key={video.id.videoId}/>
                ))}
            </Col>
        </Row>
    )
}

export default WatchScreen