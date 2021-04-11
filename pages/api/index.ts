require("dotenv/config");

import { ApiEndpoint } from "core/types";

/**
 * api/index
 * ----------------------------------------------------------------------
 * Endpoint raíz.
 *
 * @param req
 * @param res
 */
const handler: ApiEndpoint = (req, res) => {
  res
  .status(200)
  .json({
    time: Date.now()
  });
};

export default handler;
