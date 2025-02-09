import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import { UserModel, TodoModel } from "./db/index.js";

const app = express();
const port = 3000;
const users = [];

const JWT_SECRET = "asdasdjhaskdjakdaskssnf";

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json()); // parsing json requests

// app.get("/", (req, res) => {
//   res.sendFile(
//     "/Users/harneetsahi/Downloads/coding/webdev/todoapp/frontend/src/index.html"
//   );
// });

app.post("/signup", (req, res) => {
  UserModel.insert({
    name: "harneet",
    email: "harneet@gmail.com",
    password: "randompass",
  });
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.json({
      message: "Please enter a valid username and password",
    });
    console.log("Please enter a valid username and password");
  }

  const user = users.find((user) => user.username === username);

  if (user) {
    res.json("Please sign in using your existing account");
    console.log("Please sign in using your existing account");
  } else {
    users.push({ username, password });

    res.json({
      message: "You have successfully signed up",
    });
  }
});

app.post("/login", (req, res) => {
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

//// middlware
function auth(req, res, next) {
  const token = req.headers.token;
  const decodedInfo = jwt.verify(token, JWT_SECRET);

  if (!token) {
    throw new Error("Unauthorized request");
  }

  if (decodedInfo.username) {
    req.username = decodedInfo.username; /// passing on username via req.username
    next();
  } else {
    res.json({
      message: "You are not logged in",
    });
  }
}

app.get("/me", auth, (req, res) => {
  const user = users.find((user) => user.username === req.username);

  if (user) {
    res.json({
      username: user.username,
      password: user.password,
    });
  }
});

////!SECTION todos

app.post("/todo", (req, res) => {});

app.get("/todos", (req, res) => {});

app.listen(port);

////////////////////////////////////////////////!SECTION

export { app };
