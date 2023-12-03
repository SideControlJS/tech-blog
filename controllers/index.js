// Path: controllers/index.js
const router = require("express").Router();
const apiRoutes = require("./controllers/api");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;

