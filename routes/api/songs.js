const router = require("express").Router();
const songController = require("../../controllers/songController");
const fs = require("fs");
var path = require("path");
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1"
});

function uploadFile(req, res){
  console.log(req.body);
  console.log(req.files);
  var file = uuidv4() + ".wav";
  var filePath = path.join("/tmp", file);
  fs.writeFileSync(filePath, req.files.data.data);
  console.log("Saved to " + filePath);

  var uploadParams = { Bucket: process.env.S3_BUCKET, Key: '', Body: '' };
  var fileStream = fs.createReadStream(filePath);
  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = "Samples/"+path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } if (data) {
      console.log("Upload Success", data.Location);
    }
  });
  
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
