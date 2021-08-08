import { ApiEndpoint } from "core/types";

const endpoint: ApiEndpoint = (req, res) => {
  res
    .status(200)
    .json({
      date: Date.now()
    });
};

export default endpoint;
