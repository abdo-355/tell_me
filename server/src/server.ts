import mongoose from "mongoose";

import app from "./app";
export default app;

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("connected on port 8080");
    });
  })
  .catch((err) => console.log(err));
