const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    actor: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    resource: {
      type: String,
      required: true,
      trim: true,
    },

    resourceType: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    ipAddress: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    region: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    severity: {
      type: String,
      required: true,
      enum: ["LOW", "MEDIUM", "HIGH"],
      index: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["Resolved", "Unresolved"],
      default: "Unresolved",
      index: true,
    },

    timestamp: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

/*
|--------------------------------------------------------------------------
| Compound Indexes
|--------------------------------------------------------------------------
| Optimizes common filter + sort combinations
*/

auditLogSchema.index({ severity: 1, timestamp: -1 });

auditLogSchema.index({ role: 1, timestamp: -1 });

auditLogSchema.index({ status: 1, timestamp: -1 });

auditLogSchema.index({ region: 1, timestamp: -1 });

auditLogSchema.index({ actor: "text", action: "text", resource: "text" });

module.exports = mongoose.model("AuditLog", auditLogSchema);