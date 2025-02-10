import connectDB from "./db/index.js";
import { app } from "./routes/routes.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error when listening: `, error);
    });

    app.listen(`${process.env.PORT}`);
  })
  .catch((error) => console.log(error, "Error conecting to the server"));
