// imports the connect (connects to MongoDB db) and connection (to the database) objects from the 'mongoose' library
const { connect, connection } = require('mongoose');

// stores the MongoDB connections string
// 127.0.0.1 - IP address (MongoDB), 27017 - default port number (MongoDB),
const connectionString = 'mongodb://127.0.0.1:27017/thoughtsDB';


connect(connectionString);

module.exports = connection;
