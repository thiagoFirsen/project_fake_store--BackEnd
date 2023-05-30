import { NextFunction, Request, Response } from "express";
import bcript from "bcrypt";
import jwt from "jsonwebtoken";
import { makeError } from "./errorHandler";
import repositoriesUsers from "../repositories/repositoriesUsers";

const doCripto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const password = req.body.password;
    const saltRounds = process.env.SALT!;
    const hash = await bcript.hash(password, Number(saltRounds));
    res.locals.hash = hash;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization;
    if (!token) {
      throw makeError({
        message: "Necessário fazer login para realizar essa ação",
        status: 400,
      });
    }
    const userToken = token?.split(" ")[1]!;
    const verifyToken: any = jwt.verify(userToken, process.env.SECRET_TOKEN!);

    const userFromDataBase = await repositoriesUsers.selectId(
      verifyToken.userId
    );

    if (userFromDataBase.length === 0) {
      throw makeError({
        message: "Úsuario não existe",
        status: 400,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default { doCripto, verifyToken };
