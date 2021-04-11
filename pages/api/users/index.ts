require("dotenv/config");
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "config/mikro-orm";
import { User } from "entities/User";
import { ApiEndpoint } from "core/types";

const PER_PAGE: number = 3;

export const getUsersPage = async (page) => {
  const orm = await MikroORM.init(config);
  return await orm.em.findAndCount(
    User,
    {},
    {
      limit: PER_PAGE,
      offset: (parseInt(`${page}`) - 1) * PER_PAGE
    }
  );
};

const getHandler:ApiEndpoint = async (req, res) => {
  const { page } = req.query;
  const [ users, count ] = await getUsersPage(page);
  res
    .status(200)
    .json({
      users,
      totalResults: count
    });
};

const postHandler: ApiEndpoint = async (req, res) => {
  const { api_secret } = req.headers;

  if (api_secret !== process.env.API_SECRET) {
    res
    .status(401)
    .json({
      message: "API secret inválido ou não fornecido."
    })
    return;
  }

  const {
    name,
    email,
    website
  } = req.body;

  if (!name || !email || !website) {
    res
    .status(400)
    .json({
      message: "Nome, e-mail e website são obrigatórios."
    });
  }

  const orm = await MikroORM.init(config);
  let user: User = new User(name, email, website);

  try {
    await orm.em.persistAndFlush(user);
    res
      .status(200)
      .json({
        message: "Sucesso!"
      });
  } catch (e) {
    res
      .status(400)
      .json({
        message: "Erro ao salvar TODO."
      });
  }
};

/**
 * api/users
 * ----------------------------------------------------------------------
 * @param req
 * @param res
 */
const handler: ApiEndpoint = async (req, res) => {
  if (req.method === "POST") {
    await postHandler(req, res);
  } else {
    await getHandler(req, res);
  }
};

export default handler;
