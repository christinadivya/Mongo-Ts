import { Router, Request, Response } from "express";
import { UserService } from "../services/user.servcie";
import JwtAuthenticator from "../middlewares/authorization"; // Import JwtAuthenticator
import { IUser } from "../interfaces/entity/User"; // Assuming this is your user interface
import * as resHndlr from "../helpers/resHandler";
import userValidation from "../middlewares/validations/user.validation";
import { validate } from "express-validation";
import { UserDAO } from "../daos/user.dao";

const router = Router();
const userDao = new UserDAO();
const jwtAuthenticator = new JwtAuthenticator(userDao); // Create an instance of JwtAuthenticator
const userService = new UserService(userDao);
// Initialize routes
router.post("/",     [
  validate(
    userValidation.userValidation.register,
    { keyByField: true },
    { abortEarly: false }
  ),
], async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body as IUser);
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
      const users = await userService.getUsers(req.query.searchTerm as string);
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
      const user = await userService.getUserById(id);
      resHndlr.sendSuccess(res, user);
    } catch (err) {
      resHndlr.sendError(res, err);
    }
  }
);

// Add other routes as needed

export default router;
