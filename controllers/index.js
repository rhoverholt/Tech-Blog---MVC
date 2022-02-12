const router = require("express").Router();
const apiRoutes = require("./api");
const homeroutes = require("./homeroutes");

console.log("INSIDE 'controllers/index.js");
router.use("/api", apiRoutes);
console.log("NOT /api");
router.use("/", homeroutes);
console.log("NOT /");

module.exports = router;
