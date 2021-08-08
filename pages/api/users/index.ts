import prisma from "core/prisma";
import { ApiEndpoint } from "core/types";

const PER_PAGE: number = 3;

export const getUsersPage = async (page, perPage = PER_PAGE) => {
  return await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      skip: (parseInt(`${page}`) - 1) * perPage,
      take: perPage
    })
  ]);
};

const getHandler: ApiEndpoint = async (req, res) => {
  const { page } = req.query;
  const [ count, users ] = await getUsersPage(page || 1);
  res
    .status(200)
    .json({
      success: true,
      results: users,
      totalResults: count
    });
};

const endpoint: ApiEndpoint = async (req, res) => {
  if (req.method === "GET") {
    return await getHandler(req, res);
  }

  res
    .status(401)
    .json({
      success: false,
      message: "Você não tem permissão para isso."
    });
};

export default endpoint;
