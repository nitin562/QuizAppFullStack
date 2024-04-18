const ApiError = require("../Helper/ApiError");
const TryCatchWrapper = (LogicFunction) => {
  return (req, res, next) => {
    try {
      LogicFunction(req, res, next);
    } catch (error) {
      console.log(error);
      return res.send(new ApiError(500, "Server Error", error));
    }
  };
};
module.exports = {TryCatchWrapper};
