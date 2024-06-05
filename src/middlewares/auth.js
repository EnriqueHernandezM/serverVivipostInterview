import config from "../config/config.js";

export default function checkAuth(req, res, next) {
  if (req.headers.token === config.TOKEN_AUTH) {
    next();
  } else {
    return res.status(401).json({ message: "not authenticated", status: 401 });
  }
}
