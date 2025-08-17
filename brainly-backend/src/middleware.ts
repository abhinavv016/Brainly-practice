import { Request,Response,NextFunction } from "express";
import { config } from "./config";
import jwt, {JwtPayload} from "jsonwebtoken";

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(403).json({
      message: "You're not logged in"
    });
  }

  try {
    const decoded = jwt.verify(header, config.JWT_SECRET) as JwtPayloadWithId;
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({
      message: "You're not logged in"
    });
  }
};