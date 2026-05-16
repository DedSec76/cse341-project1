const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

let database;

async function connectDB() {
  if (database) return database;

  try {
    await client.connect();

    database = client.db();

    return database;
  } catch (error) {
    console.error('MongoDB connection failed');

    throw error;
  }
}

module.exports = connectDB;
