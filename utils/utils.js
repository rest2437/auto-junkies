const crypto = require("crypto");

function generateProviderId() {
  let id = crypto.randomBytes(20).toString("hex");
  return String(id);
}

module.exports = generateProviderId;
