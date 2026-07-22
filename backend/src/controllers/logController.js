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

    // Insert all logs at once
    await AuditLog.insertMany(logs, {
      ordered: false,
    });

    res.status(201).json({
      success: true,
      message: `${logs.length} logs uploaded successfully.`,
    });
  } catch (error) {
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
};