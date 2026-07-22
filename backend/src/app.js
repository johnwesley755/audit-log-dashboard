require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logRoutes = require("./routes/logRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Audit Log API Running"
    });
});

app.use("/api/logs", logRoutes);

app.use(errorHandler);

module.exports = app;