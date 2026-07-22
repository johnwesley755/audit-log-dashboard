const AuditLog = require("../models/AuditLog");
const buildQuery = require("../utils/queryBuilder");
/*
|--------------------------------------------------------------------------
| Upload Logs
|--------------------------------------------------------------------------
| POST /api/logs/upload
*/
const uploadLogs = async (req, res, next) => {
  try {
    const logs = req.body;

    if (!Array.isArray(logs) || logs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a non-empty array.",
      });
    }

    const normalizedLogs = logs.map((log) => {
      const uniqueKey = [
        log.actor || "",
        log.role || "",
        log.action || "",
        log.resource || "",
        log.resourceType || "",
        log.ipAddress || "",
        log.region || "",
        log.severity || "",
        log.status || "",
        log.timestamp || "",
      ]
        .join("|")
        .trim();

      return {
        ...log,
        uniqueKey,
      };
    });

    const inserted = await AuditLog.insertMany(normalizedLogs, {
      ordered: false,
    });

    res.status(201).json({
      success: true,
      message: `${inserted.length} logs uploaded successfully.`,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "One or more logs already exist and were skipped.",
      });
    }

    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Logs
|--------------------------------------------------------------------------
| GET /api/logs
*/
const getLogs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      role,
      severity,
      status,
      region,
      resourceType,
      sortBy = "timestamp",
      order = "desc",
    } = req.query;

   const filter = buildQuery(req.query);
    const sort = {};

    sort[sortBy] = order === "asc" ? 1 : -1;

    const currentPage = Number(page);

    const pageSize = Number(limit);

    const skip = (currentPage - 1) * pageSize;

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(pageSize),

      AuditLog.countDocuments(filter),
    ]);

    res.json({
      success: true,

      total,

      page: currentPage,

      totalPages: Math.ceil(total / pageSize),

      count: logs.length,

      logs,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Dashboard Stats
|--------------------------------------------------------------------------
| GET /api/logs/stats
*/
const deleteLog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await AuditLog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Log not found.",
      });
    }

    res.json({
      success: true,
      message: "Log deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteAllLogs = async (req, res, next) => {
  try {
    const result = await AuditLog.deleteMany({});

    res.json({
      success: true,
      message: `${result.deletedCount} logs deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await AuditLog.aggregate([
      {
        $group: {
          _id: null,

          totalLogs: {
            $sum: 1,
          },

          high: {
            $sum: {
              $cond: [
                {
                  $eq: ["$severity", "HIGH"],
                },
                1,
                0,
              ],
            },
          },

          medium: {
            $sum: {
              $cond: [
                {
                  $eq: ["$severity", "MEDIUM"],
                },
                1,
                0,
              ],
            },
          },

          low: {
            $sum: {
              $cond: [
                {
                  $eq: ["$severity", "LOW"],
                },
                1,
                0,
              ],
            },
          },

          resolved: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Resolved"],
                },
                1,
                0,
              ],
            },
          },

          unresolved: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Unresolved"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadLogs,
  getLogs,
  getStats,
  deleteLog,
  deleteAllLogs,
};