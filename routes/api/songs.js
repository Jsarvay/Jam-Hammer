const router = require("express").Router();
const songController = require("../../controllers/songController");
const fs = require("fs");
const path = require("path");

function uploadFile(req, res){
  console.log(req.body);
  console.log(req.files);
  var filePath = path.join("/tmp", '/bullshit.wav');
  fs.writeFileSync(filePath, req.files.data.data);
  console.log("Saved to " + filePath);
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
