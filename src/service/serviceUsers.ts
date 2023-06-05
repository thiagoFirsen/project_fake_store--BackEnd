import { makeError } from "../Middlewares/errorHandler";
import repositoriesLongin from "../repositories/repositoriesUsers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (user: string, password: string) => {
  const findUser = await repositoriesLongin.findUser(user);
  if (findUser.length !== 0) {
    throw makeError({ message: "Usuario ja existe", status: 400 });
  }
  const newUser = await repositoriesLongin.insertUser(user, password);
  return newUser;
};

const getPassword = async (user: any) => {
  const getPassword = await repositoriesLongin.selectPassword(user);
  return getPassword[0].password;
};

const doLogin = async (user: string, password: string) => {
  const userId = await repositoriesLongin.findUser(user);
  if (userId.length === 0) {
    throw makeError({ message: "Usuario não encontrado", status: 400 });
  }

  const passwordFromDataBase = await repositoriesLongin.selectPassword(user);
  const passwordFromDataBaseFormated = await passwordFromDataBase[0].password;

  const verifyPassword = await bcrypt.compare(
    password,
    passwordFromDataBaseFormated
  );
  if (!verifyPassword) {
    throw makeError({ message: "Senha inválida", status: 400 });
  }
  const secret = process.env.SECRET_TOKEN!;

  if (!secret) {
    throw makeError({ message: "A variável não foi definida", status: 400 });
  }
  const token = jwt.sign(
    {
      userId: await userId[0].id,
    },
    secret,
    { expiresIn: "7 days" }
  );
  return token;
};

export default { createUser, getPassword, doLogin };
