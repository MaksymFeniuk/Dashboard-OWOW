import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || process.env.Databass;
console.log('Attempting to connect to MONGODB_URI:', uri);

if (!uri) {
  console.error('❌ No MongoDB URI found in environment variables.');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Successfully connected to local MongoDB database!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB database.');
    console.error(err);
    process.exit(1);
  });
