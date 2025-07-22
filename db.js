// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("WebTesting"); // Replace with your actual DB name
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

function getDB() {
  if (!db) {
    throw new Error('❌ Database not connected. Did you call connectDB()?');
  }
  return db;
}

module.exports = { connectDB, getDB };
