import { Router, Application, json } from "express"; // Import json from express
import authRoute from "./auth.route";
import userRoute from "./user.route";
import * as Sentry from "@sentry/node";
import * as resHndlr from "../helpers/resHandler";
import cors from "cors";
import helmet from "helmet";
import middleware from "i18next-http-middleware";
import i18nextConfig from "../config/i18nextConfig";
export class IndexRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public initializeRoutes(app: Application): void {
    // translation config
    app.use(middleware.handle(i18nextConfig));
    // Cors
    const corsOptions = {
      origin: /optisolbusiness\.com|localhost.*$/,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    // This function is used to set headers for cors domain issues
    app.use(cors(corsOptions));
    // Register express.json() middleware before mounting routes
    app.use(json());
    app.use("/api", this.router);
    this.router.use("/users", userRoute);
    this.router.use("/auth", authRoute);
    // Add other routes here if needed

    //reshandler config
    app.use(
      Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
          // Capture all 404 and 500 errors
          if ([400, 401, 422, 500, 404].includes(Number(error.status))) {
            return true;
          }
          return false;
        },
      })
    );

    app.use(resHndlr.handleError);

    // moved to down because swagger throws an error
    app.use(helmet());
  }
}
