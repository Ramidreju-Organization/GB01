import React, { useEffect } from 'react';
import '../stylesheets/Chat.scss';

function Chat() {
  let sock = new WebSocket('ws://localhost:5000');
  sock.binaryType = 'blob';

  useEffect(() => {
    const element = document.querySelector('#chat-box');
    sock.onmessage = (e) => {
      e.data.text().then((data) => {
        let parsedData = JSON.parse(data);
        element.innerHTML += parsedData.message + '<br>';

        // create new element
        // add to div
      });
    };
  }, []);

  const onClick = () => {
    let body = {
      username: localStorage.getItem('username') || 'Guest',
      message: document.getElementById('text').value,
    };

    sock.send(JSON.stringify(body));
  };

  return (
    <div className="chat-div-body">
      <div className="chat-container-main">
        <div id="chat-box">

          
        </div>
        <input type="text" id="text" placeholder="Your message"></input>
        <button onClick={onClick}>Submit</button>
      </div>
    </div>
  );
}

export default Chat;
