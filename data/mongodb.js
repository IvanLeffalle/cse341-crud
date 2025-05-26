const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let dbClient;

const initDb = (callback) => {
    if (dbClient) {
        return callback(null, dbClient);
    }
    MongoClient.connect(process.env.DB_CONNECTION_STRING)
        .then (client => {
            dbClient = client.db();
            return callback(null, dbClient);
        })
        .catch(err => {
            return callback(err);
        });
};

const getDb = () => {
    if (dbClient) {
        return dbClient;
    } else {
        throw new Error('Database not initialized. Call initDb first.');
    }
}

module.exports = {
    initDb,
    getDb
};