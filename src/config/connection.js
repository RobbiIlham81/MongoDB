import { MongoClient } from "mongodb";

// Connection URL
const client = new MongoClient("mongodb://localhost:27017");

try {
  // Use connect method to connect to the server
  await client.connect();

  console.log("Connected successfully to server");
} catch (error) {
  console.log("Failed connecting to Server", error);
}

// Database Name
const dbName = "db_learnmongo";

const db = client.db(dbName);

export default db;
