
import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.MONGODB_URI;

export const client = new MongoClient(URI, {
  serverApi: ServerApiVersion.v1,
});

export async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error in mongodb connection", err);
  }
}

export async function close() {
  try {
    await client.close();
    console.log("Connection to MongoDB closed");
  } catch (err) {
    console.error("Error in closing connection", err);
  }
}
