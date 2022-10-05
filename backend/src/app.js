const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
require("dotenv").config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

const router = express.Router();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const eventRouter = require("./routes/eventRouter");
const camerasRouter = require("./routes/camerasRouter");

router.use("/user", auth, userRouter);
router.use("/auth", authRouter);
router.use("/events", eventRouter);
router.use("/cameras", camerasRouter);

// API routes
app.use("/api", router);

// Redirect all requests to the REACT app
app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "dist", "index.html")
  );
});

module.exports = app;
