import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  function home() {
    navigate('/home');
  }
  function Feed() {
    navigate('/feed');
  }
  function Login() {
    navigate('/login');
  }
  function Profile() {
    navigate('/profile');
  }

  function chat() {
    navigate('/chat');
  }

  return (
    <div className="Navbar">
      
           
      <div id="left">
      <img src="http://127.0.0.1:8080/goru-logo.png" height={100} onClick={home}></img>
      </div>


      <div id="right">
      <p onClick={chat} id="chat-label">
          CHAT
        </p>
        <p onClick={home}>HOME</p>
        <p onClick={Feed}>FEED</p>
        {localStorage.getItem('username') ? (
          <p onClick={Profile}>PROFILE</p>
        ) : (
          <p onClick={Login}>LOGIN</p>
        )}
      </div>
    </div>
  );
}
