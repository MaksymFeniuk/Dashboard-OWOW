import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || process.env.Databass;

if (!uri) {
  console.error('❌ No MongoDB URI found in environment variables.');
  process.exit(1);
}

const TestSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const TestModel = mongoose.models.Test || mongoose.model('Test', TestSchema);

async function run() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB.');

    const testDoc = new TestModel({
      name: 'Integration Test',
      message: 'Hello from the test script! If you see this in MongoDB, your local DB is working perfectly.'
    });

    await testDoc.save();
    console.log('✅ Successfully inserted a test document into the "tests" collection!');
    console.log('Document details:\n', testDoc);

  } catch (err) {
    console.error('❌ Failed to insert document:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
