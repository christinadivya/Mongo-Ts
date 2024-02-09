import { Router, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import * as resHndlr from "../helpers/resHandler";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const loginResult = await AuthService.login(req.body);
    resHndlr.sendSuccess(res, loginResult);
  } catch (err) {
    resHndlr.sendError(res, err);
  }
});

export default router;
