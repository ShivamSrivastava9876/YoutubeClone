import React from "react";
import "./_sidebar.scss";
import { Link } from 'react-router-dom'

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { Log_Out } from '../../Redux/authSlice.js';


const Sidebar = ({ sidebar, handleToggleSidebar }) => {

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(Log_Out());

    sessionStorage.removeItem("ytc-access-token");
    sessionStorage.removeItem("ytc-user");
  }


  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}>
      <Link to='/'>
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>

      <Link to='/feed/subscriptions'>
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>


      <li>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
      </li>

      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>

      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I don't Know</span>
      </li>

      <hr />

      <li onClick={logOut}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>

      <hr />
    </nav>
  )
}

export default Sidebar