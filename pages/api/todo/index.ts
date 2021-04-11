require("dotenv/config");
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "config/mikro-orm";
import { Todo } from "entities/Todo";
import { ApiEndpoint } from "core/types";

const PER_PAGE: number = 5;

const getHandler:ApiEndpoint = async (req, res) => {
  const { page } = req.query;

  const orm = await MikroORM.init(config);
  const [ todos, count ] = await orm.em.findAndCount(
    Todo,
    {},
    {
      limit: PER_PAGE,
      offset: (parseInt(`${page}`) - 1) * PER_PAGE
    }
  );

  res
    .status(200)
    .json({
      todos,
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
    description
  } = req.body;

  if (!name || !description) {
    res
      .status(400)
      .json({
        message: "Nome e descrição são obrigatórios."
      });
  }

  const orm = await MikroORM.init(config);
  let todo: Todo = new Todo(name, description);

  try {
    await orm.em.persistAndFlush(todo);
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
 * api/todo
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
