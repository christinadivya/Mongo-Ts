import { Router, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import * as resHndlr from "../helpers/resHandler";
import i18next from 'i18next';
import { AuthDAO } from "../daos/auth.dao";

const router = Router();
const authDao = new AuthDAO();
const authService = new AuthService(i18next, authDao);

router.post("/login", async (req: Request, res: Response) => {
  try {
    const loginResult = await authService.login(req.body);
    resHndlr.sendSuccess(res, loginResult);
  } catch (err) {
    resHndlr.sendError(res, err);
  }
});

export default router;
