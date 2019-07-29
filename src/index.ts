import serverless from "serverless-http";
import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler());
}

/**
 * Exports express
 * @public
 */
if (!process.env.IS_LAMBDA) {
  // listen to requests
  app.listen(app.get("port"), () => {
    console.info(
      `server started on port ${app.get("port")} (${process.env.NODE_ENV})`,
    );
    console.info("  Press CTRL-C to stop\n");
  });
}
export const handler = serverless(app);
export default app;
