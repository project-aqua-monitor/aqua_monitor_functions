import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { connect } from "../lib/database";

export async function saveSensorData(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    await connect();

    return { body: 'Data saved' };
};

app.http('saveSensorData', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: saveSensorData
});
