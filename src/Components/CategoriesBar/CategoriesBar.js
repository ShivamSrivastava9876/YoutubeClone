import React, { useState } from 'react'
import './_categoriesBar.scss'
import { useDispatch } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '../../api.js'
import { getPopularVideos } from '../../Screens/HomeScreen/HomeScreen.js'


const keywords = [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Guitar',
  'Bengali Songs',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrid',
  'Gatsby',
  'Poor Coder',
  'Shwetabh',
]

export const getVideosByCategory = createAsyncThunk(
  'homeVideos/getVideosByCategory',
  async (keyword, { getState }) => {
    try {
      const category = keyword
      const { data } = await request.get('/search', {
        params: {
          part: 'snippet',
          maxResults: 20,
          pageToken: getState().homeVideoReducer.nextPageToken,
          q: keyword,
          type: 'video'
        }
      })
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

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState('All')

  const dispatch = useDispatch();
  const handleClick = value => {
    setActiveElement(value)
    if (value === 'All') {
      dispatch(getPopularVideos())
    } else {
      dispatch(getVideosByCategory(value))
    }
  }

  return (
    <div className='categoriesBar'>
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeElement === value ? 'active' : ''}>
          {value}
        </span>
      ))}
    </div>
  )
}

export default CategoriesBar