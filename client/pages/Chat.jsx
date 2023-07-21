import React, { useEffect, useState } from 'react';
import '../stylesheets/Chat.scss';

function Chat() {
  let sock = new WebSocket('ws://localhost:5000');
  sock.binaryType = 'blob';

  const [messageState, setMessageState] = useState([]);
  const [testState, setTestState] = useState(0);

  useEffect(() => {
    const element = document.querySelector('#chat-box');
    sock.onmessage = (e) => {
      e.data.text().then((data) => {
        let parsedData = JSON.parse(data);

        element.innerHTML +=
          parsedData.username + ': ' + parsedData.message + '<br>'

        // stateHelper(parsedData)

        // console.log(messageState)

        // element.appendChild();

        // create new element
        // add to div
      });
    };
  }, []);

  // const stateHelper = (obj) => {
  //   console.log(obj);
  //   setMessageState([...messageState].push(obj));
  // };

  const onClick = (e) => {
    e.preventDefault()
    let body = {
      username: localStorage.getItem('username') || 'Guest',
      message: document.getElementById('text').value,
    };

    sock.send(JSON.stringify(body));

    document.getElementById('text').value = '';
  };

  return (
    <div className="chat-div-body">
      <div className="chat-container-main">
        <div id="chat-box"></div>
        {/* {messageState.map((item) => {
         return  <ChatMessage
            sender={item.username}
            message={item.message}
          />;
        })} */}
        <form onSubmit={onClick}>
          <input type="text" id="text" placeholder='Type a message here...'></input>
          {/* <input type='submit'></input> */}
        </form>
      </div>
    </div>
  );
}

export default Chat;
