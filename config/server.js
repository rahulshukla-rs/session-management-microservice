const SERVER_PORT = process.env.PORT || 5000;

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/s-m-m?retryWrites=true";
const MONGO_PORT = process.env.MONGO_PORT || 27017;

const SESSION_KEY = process.env.SESSION_KEY || "s-m-m";




module.exports = {
  SERVER_PORT: SERVER_PORT,
  mongodb: {
    MONGO_URL: MONGO_URL,
    MONGO_PORT: MONGO_PORT
  },
  SESSION_KEY: SESSION_KEY,
};
