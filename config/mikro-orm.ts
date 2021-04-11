require("tsconfig-paths").register();

import { Options } from "@mikro-orm/core";
import { Todo } from "entities/Todo";
import { User } from "entities/User";

const config: Options = {
  dbName: process.env.ORM_DATABASE,
  type: (process.env.ORM_CONNECTION_TYPE as any),
  host: process.env.ORM_HOSTNAME,
  port: Number(process.env.ORM_PORT),
  user: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  entities: [
    Todo,
    User
  ],
  discovery: {
    disableDynamicFileAccess: false
  },
  debug: (process.env.NODE_ENV === "development")
};

export default config;
