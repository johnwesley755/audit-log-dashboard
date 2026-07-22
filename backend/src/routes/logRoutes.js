const express = require("express");

const {
    uploadLogs,
    getLogs,
    getStats
} = require("../controllers/logController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Upload Logs
|--------------------------------------------------------------------------
*/
router.post("/upload", uploadLogs);

/*
|--------------------------------------------------------------------------
| Get Dashboard Statistics
|--------------------------------------------------------------------------
*/
router.get("/stats", getStats);

/*
|--------------------------------------------------------------------------
| Get Logs
|--------------------------------------------------------------------------
*/
router.get("/", getLogs);

module.exports = router;