import prisma from "core/prisma";
import { ApiEndpoint } from "core/types";
import { hasOwn } from "core/utils";

const getHandler: ApiEndpoint = async (req, res) => {
  let page = parseInt(req.query.page as string) || 1;
  let perPage = parseInt(req.query.perPage as string) || 5;

  const [ count, todos ] = await prisma.$transaction([
    prisma.todo.count(),
    prisma.todo.findMany({
      skip: (parseInt(`${page}`) - 1) * perPage,
      take: perPage
    })
  ]);

  res
    .status(200)
    .json({
      success: true,
      results: todos,
      totalResults: count,
    });
};

const postHandler: ApiEndpoint = async (req, res) => {
  const { body } = req;

  if (!hasOwn(body, "name")) {
    throw new Error("Request inválido.");
  }

  let create = await prisma.todo.create({
    data: {
      name: body.name,
      description: body.description || "",
    },
  });

  res
    .status(200)
    .json({
      success: true,
      result: create
    });
};

const putHandler: ApiEndpoint = async (req, res) => {
  const { body } = req;

  if (!hasOwn(body, "id")) {
    throw new Error("Forneça um ID válido.");
  }

  if (!hasOwn(body, "name")) {
    throw new Error("Request inválido.");
  }

  let put = await prisma.todo.update({
    data: {
      name: body.name,
      description: body.description || "",
    },
    where: {
      id: body.id
    }
  });

  res
    .status(200)
    .json({
      success: true,
      result: put
    });
};

const deleteHandler: ApiEndpoint = async (req, res) => {
  const todoId = parseInt(req.body.id as string);

  if (isNaN(todoId)) {
    throw new Error("Forneça um ID válido.");
  }

  let exclude = await prisma.todo.delete({
    where: {
      id: todoId
    }
  });

  res
    .status(200)
    .json({
      success: true,
      message: "Tarefa excluída com sucesso."
    });
};

const endpoint: ApiEndpoint = async (req, res) => {
  try {
    switch (req.method) {
      // case "POST":
      //   await postHandler(req, res); break;
      // case "PUT":
      //   await putHandler(req, res); break;
      // case "DELETE":
      //   await deleteHandler(req, res); break;
      default:
        await getHandler(req, res); break;
    }
  } catch (e) {
    res
      .status(400)
      .json({
        success: false,
        message: e.meta.cause || e.message || "Request inválido.",
        details: {
          ...e
        }
      });
  }
};

export default endpoint;
