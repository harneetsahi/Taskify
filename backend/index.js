import connectDB from "./db/index.js";
import { app } from "./routes/routes.js";

const port = 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error when listening: `, error);
    });

    app.listen(port);
  })
  .catch((error) => console.log(error, "Error conecting to the server"));
