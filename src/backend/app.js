const cors = require("cors");
const createError = require("http-errors");
const express = require("express");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/", apiRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
