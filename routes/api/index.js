const router = require("express").Router();
const songRoutes = require("./songs");
const userRoutes = require("./user");

// Book routes
router.use("/song", songRoutes);
router.use("/users", userRoutes);

module.exports = router;
