const express = require('express');
const { dbConnectionFn } = require('./config/dbConnection');
const userFormRouters = require('./router/userFormRouter');
const cors = require('cors');


const port = 3001;
const form = express();

form.use(express.json()); // parse incoming request into JSON
dbConnectionFn();

form.use(cors({
    orgin: 'https://incomparable-meringue-630274.netlify.app/'   // frontend netlify link
})); // stablish connection with backend with frontend.


// Corrected line below
form.use('/user', userFormRouters.router);

form.listen(port, (error) => {
  if (error) {
    console.error(`Server not started on portNo: ${port}`);
  } else {
    console.log(`Server started successfully on portNo: ${port}`);
  }
});
