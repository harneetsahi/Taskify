import express from "express";
import cors from "cors";

const app = express();

// cors
app.use(
  cors({
    origin: `${process.env.CORS}`,
    credentials: true,
  })
);

// parsing json requests
app.use(express.json());

export { app }; // to routes folder
