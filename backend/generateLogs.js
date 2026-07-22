const fs = require("fs");

const actors = [
  "priya.nair",
  "rahul",
  "john",
  "alex",
  "meena",
  "arun",
  "kumar",
  "sneha",
];

const roles = ["admin", "developer", "user"];

const actions = [
  "LOGIN",
  "LOGOUT",
  "DELETE_USER",
  "CREATE_USER",
  "UPDATE_PROFILE",
  "DOWNLOAD_REPORT",
];

const resourceTypes = [
  "USER",
  "AUTH",
  "REPORT",
  "SETTINGS",
];

const regions = [
  "ap-south-1",
  "us-east-1",
  "eu-west-1",
];

const severities = [
  "LOW",
  "MEDIUM",
  "HIGH",
];

const statuses = [
  "Resolved",
  "Unresolved",
];

const logs = [];

for (let i = 1; i <= 10000; i++) {

  logs.push({

    actor:
      actors[Math.floor(Math.random() * actors.length)] +
      "@company.com",

    role:
      roles[Math.floor(Math.random() * roles.length)],

    action:
      actions[Math.floor(Math.random() * actions.length)],

    resource: `/api/users/${Math.ceil(Math.random() * 5000)}`,

    resourceType:
      resourceTypes[
        Math.floor(Math.random() * resourceTypes.length)
      ],

    ipAddress: `192.168.${Math.floor(
      Math.random() * 255
    )}.${Math.floor(Math.random() * 255)}`,

    region:
      regions[Math.floor(Math.random() * regions.length)],

    severity:
      severities[
        Math.floor(Math.random() * severities.length)
      ],

    status:
      statuses[Math.floor(Math.random() * statuses.length)],

    timestamp: new Date(
      Date.now() - Math.random() * 10000000000
    ).toISOString(),

  });

}

fs.writeFileSync(
  "logs.json",
  JSON.stringify(logs, null, 2)
);

console.log("✅ logs.json generated with 10,000 records");