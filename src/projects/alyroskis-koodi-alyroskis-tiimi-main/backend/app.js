var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// for mobile
const cors = require("cors");

var isAuthenticated = require("./middleware/auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/loginRouter");
var buildingsRouter = require("./routes/buildingsRouter");
var smartTrashRouter = require("./routes/smartTrashRouter");
var pushTokenRouter = require("./routes/pushTokenRouter");
var notificationsRouter = require("./routes/notificationsRouter");
var userEditRouter = require("./routes/userEditRouter");
var forgotPasswordRouter = require("./routes/forgotPassword");
var measurementLogRouter = require("./routes/measurementLogRouter");
var verifyCodeRouter = require("./routes/verifyCode");
var resetPasswordRouter = require("./routes/resetPassword");
// MQTT listener endpoints
const mqttListener = require("./mqtt/mqtt_listener");

const knex = require("./db");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// for mobile
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.locals.knex = knex;

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/buildings", isAuthenticated, buildingsRouter);
app.use("/smart_trash", isAuthenticated, smartTrashRouter);
app.use("/push-token", isAuthenticated, pushTokenRouter);
app.use("/notifications", isAuthenticated, notificationsRouter);
app.use("/userEdit", isAuthenticated, userEditRouter);
app.use("/send-email", forgotPasswordRouter);
app.use("/measurement_log", measurementLogRouter);
app.use("/verify-code", verifyCodeRouter);
app.use("/reset-password", resetPasswordRouter);
app.use("/userEdit", isAuthenticated, userEditRouter);
app.use("/send-email", forgotPasswordRouter);
app.use("/verify-code", verifyCodeRouter);
app.use("/reset-password", resetPasswordRouter);

// Mount MQTT listener endpoints under /mqtt
app.use("/mqtt", mqttListener);

module.exports = app;
