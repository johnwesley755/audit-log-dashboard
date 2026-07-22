const buildQuery = (queryParams) => {
  const {
    search,
    role,
    severity,
    status,
    region,
    resourceType,
  } = queryParams;

  const filter = {};

  if (role) {
    filter.role = role;
  }

  if (severity) {
    filter.severity = severity;
  }

  if (status) {
    filter.status = status;
  }

  if (region) {
    filter.region = region;
  }

  if (resourceType) {
    filter.resourceType = resourceType;
  }

  if (search) {
    filter.$or = [
      {
        actor: {
          $regex: search,
          $options: "i",
        },
      },
      {
        action: {
          $regex: search,
          $options: "i",
        },
      },
      {
        resource: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  return filter;
};

module.exports = buildQuery;