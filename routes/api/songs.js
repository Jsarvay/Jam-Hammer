const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "/api/song"
router.route("/")
  .get(songController.findAll)
  .post(songController.create);

// Matches with "/api/song/:id"
router
  .route("/:id")
  .get(songController.findById)
  .put(songController.update)
  .delete(songController.remove);

module.exports = router;
