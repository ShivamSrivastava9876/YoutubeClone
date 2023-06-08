import React, { useEffect, useState } from 'react'
import Comment from '../Comment/Comment.js'
import './_comments.scss'
import { useDispatch, useSelector } from 'react-redux'
import request from '../../api.js'

import { createAsyncThunk } from '@reduxjs/toolkit'

export const getCommentsOfVideosById = createAsyncThunk(
   'videos/getCommentsById',
   async (id) => {
      try {
         const { data } = await request.get('/commentThreads', {
            params: {
               part: 'snippet',
               videoId: id,
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

export const addComment = createAsyncThunk(
   'videos/addComment',
   async ({ id, text }, { dispatch, getState }) => {
      try {

         const obj = {
            snippet: {
               videoId: id,
               topLevelComment: {
                  snippet: {
                     textOriginal: text,
                  },
               },
            },
         }

         await request.post('/commentThreads', obj, {
            params: {
               part: 'snippet',
            },
            headers: {
               Authorization: `Bearer ${getState().authentication.accessToken}`,
            },
         })

         setTimeout(() => dispatch(getCommentsOfVideosById(id)), 3000);


      }
      catch (error) {
         console.log(error.message)
         throw error
      }
   }
)

const Comments = ({ videoId, totalComments }) => {

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCommentsOfVideosById(videoId))
   }, [videoId, dispatch])

   const comments = useSelector(state => state.getComments.comments)

   const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet)

   const [text, setText] = useState('')

   const handleComment = (e) => {
      e.preventDefault()
      if (text.length === 0) return

      dispatch(addComment(videoId, text))
      setText('')
   }
   return (
      <div className='comments'>
         <p>{totalComments} Comments</p>
         <div className='comments__form d-flex w-100 my-2'>
            <img
               src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
               alt=''
               className='rounded-circle mr-3'
            />
            <form onSubmit={handleComment} className='d-flex flex-grow-1'>
               <input
                  type='text'
                  className='flex-grow-1'
                  placeholder='Write a comment...'
                  value={text}
                  onChange={e => setText(e.target.value)}
               />
               <button className='border-0 p-2'>Comment</button>
            </form>
         </div>
         <div className='comments__list'>
            {_comments?.map((comment, i) => (
               <Comment comment={comment} key={i} />
            ))}
         </div>
      </div>
   )
}

export default Comments