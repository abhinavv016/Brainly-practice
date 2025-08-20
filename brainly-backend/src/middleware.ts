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
    const headerStr = String(header)
    const token = headerStr.startsWith("Bearer ") ? headerStr.split(" ")[1]: headerStr;
    if(!token){
      return res.status(403).json({
        message: "You're not logged in"
      })
    }
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayloadWithId;
    req.userId = decoded.id;
    next();
  } catch (err){
    console.error("Auth middleware error:", err);
    res.status(403).json({
      message: "You're not logged in"
    });
  }
};