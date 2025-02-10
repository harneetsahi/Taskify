import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.headers.token;
  const decodedInfo = jwt.verify(token, `${process.env.JWT_SECRET}`);

  if (!token) {
    throw new Error("Unauthorized request");
  }

  if (decodedInfo) {
    req.userId = decodedInfo.id; /// passing on userId via req
    next();
  } else {
    res.status(403).json({
      message: "You are not logged in",
    });
  }
}
