import express, { Application } from "express";
import * as swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import connectDB from "./db";
import { IndexRoute } from "./routes/index.route";

async function runServer(): Promise<void> {
  try {
    const app: Application = express();
    const PORT = process.env.PORT || 3000;

    // Db connection
    connectDB();

    // Load Swagger YAML file
    const swaggerDocument = YAML.load("./src/swagger.yaml");

    // Middleware to serve Swagger UI
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Initialize routes
    const indexRoute = new IndexRoute();
    indexRoute.initializeRoutes(app);
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

runServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
