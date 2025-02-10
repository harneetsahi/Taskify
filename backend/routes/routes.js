import { app } from "../app.js";
import { UserModel, TodoModel } from "../model/users.model.js";
import { auth } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "asdasasdasd";

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    await UserModel.create({
      name: name,
      email: email,
      password: password,
    });

    res.json({
      message: "You are signed up",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email,
    password,
  });

  console.log(user);

  try {
    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);

      res.json({
        message: token,
      });
    } else {
      console.log("Incorrect crendentials");
      res.status(403).json({
        message: "Incorrect crendentials",
      });
    }
  } catch (error) {
    res.json({
      message: "Error logging in",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const title = req.body.title;
  const status = req.body.status;
  const userId = req.userId;

  try {
    await TodoModel.create({
      title,
      status,
      userId,
    });

    res.json({
      message: "Todo added",
    });
  } catch (error) {
    res.json({
      message: "Error creating a todo",
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await TodoModel.find({ userId });

    const todoTitles = todos.map((todo) => todo.title);

    res.json({
      allTodos: todoTitles,
    });
  } catch (error) {
    res.json({
      mesage: "Error fetching todos",
    });
  }
});

export { app }; // to index.js in backend root folder
