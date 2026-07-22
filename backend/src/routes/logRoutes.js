const express = require("express");

const {
    uploadLogs,
    getLogs,
    getStats,
    deleteLog,
    deleteAllLogs,
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

router.delete("/all", deleteAllLogs);

router.delete("/:id", deleteLog);

module.exports = router;