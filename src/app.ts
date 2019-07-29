import express from "express";
import bodyParser from "body-parser";

import { port } from "./config/vars";
import routes from "./routes";

const app = express();
app.set("port", port);
app.use(bodyParser.json());
app.use("/v1", routes);

export default app;
