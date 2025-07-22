const mongoose = require('mongodb')
mongoose.connect(process.env.MONGO_DB);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  joinedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
}

async function saveUser({ username, email }) {
  try {
    const user = new User({ username, email });
    await user.save();
    console.log('✅ User saved');
  } catch (err) {
    console.error('❌ Save error:', err.message);
  }
}

module.exports = { connectDB, saveUser };