const router = require("express").Router();
const songRoutes = require("./songs");
const userRoutes = require("./user");
const loginRoute = require("./login");
const registerRoute = require("./register");

// Book routes
router.use("/song", songRoutes);
router.use("/users", userRoutes);
router.use("/login", loginRoute);
router.use("/register", registerRoute);

module.exports = router;
