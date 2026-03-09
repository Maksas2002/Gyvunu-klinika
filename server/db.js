const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://admin:admin@cluster0.kweva0t.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;