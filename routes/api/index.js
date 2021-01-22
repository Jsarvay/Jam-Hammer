const router = require("express").Router();
const songRoutes = require("./songs");

// Book routes
router.use("/song", songRoutes);

module.exports = router;
