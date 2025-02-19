const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

// require in dotenv.config
// use process.env.variable name to extract the hidden info from the .env file
// test with a console log of process.env and see if it prints an object with the variable names as the strings and the keys as the values

const app = express();
const PORT = 3000;

// const http = require('http').Server(app)
const cors = require('cors');

// app.use(cors)

//WEBSOCKET SERVER
// const socketIO = require('socket.io')(http, {
//   cors: {
//     origin: 'http://127.0.0.1:8080',
//     credentials: true
//   },
// });

// socketIO.on('connection', (socket) => {
//   console.log('user connected', socket.id);
//   // socket.on('custom-event', (item) => {
//   //   console.log(item);
//   // });

// });

// Routers
const techRouter = require(path.join(__dirname, '/src/routes/techRouter'));
const postRouter = require(path.join(__dirname, '/src/routes/postRouter'));
const userRouter = require(path.join(__dirname, '/src/routes/userRouter'));

// Parse incoming JSON, static reqeusts, forms, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./dist'));

//Catch Oauth button requests
app.use('/api/oauth', (req, res) => {
  console.log('entered oauth on backend');
  console.log(process.env.CLIENT_ID);
  const hrefString =
    'https://github.com/login/oauth/authorize?scope=user:email&client_id=' +
    process.env.CLIENT_ID;
  console.log(hrefString);
  res.redirect(hrefString);
});

app.use('/api/authenticate', (req, res) => {
  console.log('rerouted from oauth page');
  tempCode = req.query.code;
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  let accessToken;
  fetch(
    `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${tempCode}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      accessToken = data.access_token;
      fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const userName = data.name;
          res.cookie(`userName`, userName, { maxAge: 30000 });
          return res.redirect('http://localhost:8080/login');
        })
        .catch((err) => {
          console.log('error occurred');
        });
    })
    .catch((err) => {
      console.log('an error occurred');
    });
});

// on load of log in page, send fetch request to server to get data stored in server

// API router for server handling of db info
app.use('/api/tech', techRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

// Default unknown page handler
app.use('*', (req, res) => {
  res.status(404).send('Error: Page not found.');
});

// Express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred.' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;
