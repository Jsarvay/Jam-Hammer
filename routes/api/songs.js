const router = require("express").Router();
const songController = require("../../controllers/songController");
const fs = require("fs");

function uploadFile(req, res){
  console.log(req.body);
  console.log(req.files);
  fs.writeFileSync("uploads/bullshit.wav", req.files.data.data);
  res.status(204).send({});
}

// Matches with "/api/song"
router.route("/")
  .get(songController.findAll)
  .post(uploadFile);

// Matches with "/api/song/:id"
router
  .route("/:id")
  .get(songController.findById)
  .put(songController.update)
  .delete(songController.remove);

module.exports = router;
