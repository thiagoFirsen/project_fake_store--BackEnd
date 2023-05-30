import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
const knexInstance: Knex = knex(config);

const insertUser = (user: string, password: string) =>
  knexInstance("users").insert({
    user,
    password,
  });

const findUser = (user: string) =>
  knexInstance("users").select("id").where({ user });

const selectPassword = (user: any) =>
  knexInstance("users").select("password").where({ user });

const selectId = (id: any) => knexInstance("users").select("*").where({ id });

export default { insertUser, findUser, selectPassword, selectId };
