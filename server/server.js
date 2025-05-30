require('dotenv').config({ path: '../.env' });
const path = require('path');
const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './../build')));
app.use('/api', recipeRoutes);
app.use('/', authRoutes);

//
//
//
//
//
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = {
    ...defaultErr,
    log: err.log,

    message: err.message,
  };
  console.log(errorObj.log);

  res.status(errorObj.status).json(errorObj.message);

});
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
