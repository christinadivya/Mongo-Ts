import { Router, Application, json } from "express"; // Import json from express
import authRoute from "./auth.route";
import userRoute from "./user.route";

export class IndexRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public initializeRoutes(
    app: Application,
  ): void {
    // Register express.json() middleware before mounting routes
    app.use(json());
    app.use("/api", this.router);
    this.router.use("/users", userRoute);
    this.router.use("/auth", authRoute);
    // Add other routes here if needed
  }
}
