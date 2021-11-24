import * as express from "express";
import { createConnection } from "typeorm";

import indexRouter from "./routes/index";

const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({ message: err.message, code: err.code });
});

app.use("/", indexRouter);
createConnection()
  .then((conn) => {
    //createInitialData();
    app.listen(port, () => console.log("Listening on port 3000"));
  })
  .catch((err) => console.log("DATABASE ERROR", err));

export default app;
