import { PrismaClient } from "@prisma/client";

/**
 * core/prisma
 * ----------------------------------------------------------------------
 * Garante que temos apenas uma instância do client do Prisma.
 *
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;
