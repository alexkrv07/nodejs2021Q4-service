// const dotenv = require('dotenv');
// const path = require('path');
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const PORT = process.env;
const NODE_ENV = process.env.NODE_ENV;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const AUTH_MODE = process.env.AUTH_MODE === 'true';

// export default {
//   PORT: process.env.PORT,
//   NODE_ENV: process.env.NODE_ENV,
//   MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
//   JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
//   AUTH_MODE: process.env.AUTH_MODE === 'true'
// };

export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE }
