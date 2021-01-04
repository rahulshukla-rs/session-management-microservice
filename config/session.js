const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

/* require config and routes */
const config = require("./server");

const store = new MongoDBStore({
    uri: config.mongodb.MONGO_URL,
    collection: 'mySessions'
});

module.exports = store;