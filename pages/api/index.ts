import { ApiEndpoint } from "core/types";
import Data from "package.json";

/**
 * api/index
 * ----------------------------------------------------------------------
 * Endpoint de teste para API.
 * 
 * @param req 
 * @param res 
 * 
 * @since 0.2.0
 */
const Endpoint: ApiEndpoint = (req, res) => {
  res
    .status(200)
    .json({
      name: Data.name,
      description: Data.description,
      version: Data.version,
      author: Data.author,
      license: Data.license,
      date: Date.now()
    });
  res.end();
};

export default Endpoint;
