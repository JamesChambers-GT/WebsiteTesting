// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI; // store the full URI as an env var in Render

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("WebTesting"); // replace with your DB name
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

function getDB() {
  return db;
}

async function saveUser({ username, email }) {
  const users = db.collection("users");
  return await users.insertOne({ username, email, joinedAt: new Date() });
}

async function getAllUsers() {
  const users = db.collection("users");
  return await users.find({}).toArray();
}

module.exports = { connectDB, getDB, saveUser, getAllUsers };
