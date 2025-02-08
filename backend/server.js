import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const JWT_SECRET = "asdasdjhaskdjakdaskssnf";
const app = express();
const port = 3000;

app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.json({
      message: "Please enter a valid username and password",
    });
  }

  const user = users.find((user) => user.username === username);

  if (user) {
    res.json("Please sign in using your existing account");
  }

  users.push({ username, password });

  res.json({
    message: "You have successfully signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.json({
      message: "Please enter a valid username and password",
    });
  }

  const user = users.find((user) => user.username === username);

  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json({ token });
  } else {
    res.json({
      message: "Incorrect credentials",
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  const decodedInfo = jwt.verify(token, JWT_SECRET);

  if (decodedInfo.username) {
    const user = users.find((user) => user.username === decodedInfo.username);

    if (user) {
      res.json({
        username: user.username,
        password: user.password,
      });
    }
  }
});

app.listen(port);
