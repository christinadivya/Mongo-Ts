import { Router, Request, Response } from "express";
import { UserService } from "../services/user.servcie";
import JwtAuthenticator from "../middlewares/authorization"; // Import JwtAuthenticator
import { IUser } from "../interfaces/entity/User"; // Assuming this is your user interface
import * as resHndlr from "../helpers/resHandler";

const router = Router();
const jwtAuthenticator = new JwtAuthenticator(); // Create an instance of JwtAuthenticator

// Initialize routes
router.post("/", async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body as IUser);
    resHndlr.sendSuccess(res, user);
  } catch (err) {
    resHndlr.sendError(res, err);
  }
});

router.get(
  "/",
  jwtAuthenticator.authenticateAndAuthorizeToken,
  async (req: Request, res: Response) => {
    try {
      const users = await UserService.getUsers(req.query.searchTerm as string);
      resHndlr.sendSuccess(res, users);
    } catch (err) {
      resHndlr.sendError(res, err);
    }
  }
);

router.get(
  "/view-detail",
  jwtAuthenticator.authenticateAndAuthorizeToken,
  async (req: Request, res: Response) => {
    try {
      const typedReq = req as Request & { user?: IUser; token?: string };
      const id = typedReq.user.id;
      const user = await UserService.getUserById(id);
      resHndlr.sendSuccess(res, user);
    } catch (err) {
      resHndlr.sendError(res, err);
    }
  }
);

// Add other routes as needed

export default router;
