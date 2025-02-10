import { app } from "../app.js";
import { UserModel, TodoModel } from "../model/users.model.js";
import { auth } from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.json({
      message: "You are signed up",
    });
  } catch (error) {
    res.json({
      message: "User already exists",
    });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`);

      return res.json({
        message: token,
      });
    } else {
      return res.status(401).json({ message: "Incorrect credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
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

    res.json({
      todos,
    });
  } catch (error) {
    res.json({
      mesage: "Error fetching todos",
    });
  }
});

export { app }; // to index.js in backend root folder
