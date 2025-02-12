import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { client, close, connect } from "../lib/database";

export async function getSensorData(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  await connect();
  const db = client.db("sensorData");
  const collection = db.collection("data");

  try {
    const data = await collection.find().toArray()
    return { body: JSON.stringify(data) };
  } catch (err) {
    context.log("Mongodb Error:", err);
    return { body: "Error in fetching data" };
  } finally {
    close();
  }

  return { body: `Hello, ${name}!` };
}

app.http("getSensorData", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: getSensorData,
});
