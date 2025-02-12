import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { client, close, connect } from "../lib/database";

export async function saveSensorData(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const body = request.body;
  const _data = await body.getReader().read();
  const data = JSON.parse(new TextDecoder().decode(_data.value));

  await connect();
  const db = client.db("sensorData");
  const collection = db.collection("data");

  try {
    await collection.insertOne(data);
  } catch (err) {
    context.log(err);
    return { body: "Error in saving data" };
  } finally {
    await close();
  }

  return { body: "Data saved" };
}

app.http("saveSensorData", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: saveSensorData,
});
