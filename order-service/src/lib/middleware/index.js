const axios = require("axios");

exports.checkToken = async (req, res, next) => {
  const response = await axios.post(
    process.env.AUTH_SERVIC_URL + "/auth/check-token",
    req.body
  );
  const status = response.status;
  if (status !== 200) {
    if (response.body?.message) next(new Error(response.body?.message));
    next(new Error("Validation error!"));
  }
  req.user = response.body?.user;

  next();
}
