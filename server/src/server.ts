import mongoose from "mongoose";

import app, { httpServer as http } from "./app";

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI)
  .then(() => {
    http.listen(process.env.PORT || 8080, () => {
      console.log("connected on port 8080");
    });
  })
  .catch((err) => console.log(err));
