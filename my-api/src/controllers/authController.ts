import { Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  // Hvis auth-middleware IKKE har lagt en bruger på req,
  // er brugeren ikke logget ind eller token er ugyldig

  if (!req.user) {
    return res.status(401).json({
      message: "User not authenticated or token is missing/invalid",
    });
  }

  // Hvis alt er OK, returner den dekodede brugerinfo fra token
  return res.status(200).json(req.user);
};
