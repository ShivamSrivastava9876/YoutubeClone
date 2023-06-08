import React, { children, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import SearchScreen from './Screens/searchScreen'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import './_app.scss'
import { useSelector } from 'react-redux'
import WatchScreen from './Screens/WatchScreen/WatchScreen'
import SubscriptionsScreen from './Screens/SubscriptionsScreen/SubscriptionsScreen'

const Layout = ({ children }) => {

   const [sidebar, toggleSidebar] = useState(false)

   const handleToggleSidebar = () => toggleSidebar(value => !value)

   return (
      <>
         <Header handleToggleSidebar={handleToggleSidebar} />
         <div className="app__container">
            <Sidebar
               sidebar={sidebar}
               handleToggleSidebar={handleToggleSidebar}
            />
            <Container fluid className="app__main ">
               {children}
            </Container>
         </div>
      </>
   )
}

const App = () => {

   const { accessToken, loading } = useSelector((state) => state.authentication);

   const navigate = useNavigate();

   useEffect(() => {
      if (!loading && !accessToken) {
         navigate('/auth')
      }
   }, [accessToken, loading, navigate]);

   return (
      <Routes>
         <Route path='/' element={<Layout><HomeScreen /></Layout>} />
         <Route path='/auth' element={<LoginScreen />} />
         <Route path='/search/:query' element={<Layout><SearchScreen /></Layout>} />
         <Route path='/watch/:id' element={<Layout><WatchScreen /></Layout>} />
         <Route path='/feed/subscriptions' element={<Layout><SubscriptionsScreen/></Layout>} />
         <Route path='*' element={<Navigate to='/' />} />
      </Routes>
   )
}

export default App