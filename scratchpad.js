const crypto = require("crypto");
//===============================FUNTIONS===========================
function generateProviderId() {
  let id = crypto.randomBytes(20).toString("hex");
  // let id = (Math.random() + 1).toString(36).substring(7);
  // console.log(generateProviderId("random", id));
  return id;
}
console.log(generateProviderId());
