const router = require("express").Router();
const songController = require("../../controllers/songController");
const songDb = require("../../models/song");
const userDb = require("../../models/users");
const fs = require("fs");
var path = require("path");
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const authUtil = require("../../utils/userAuth");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1"
});

function uploadFile(req, res) {
  var user = authUtil.authUser(req).then((user) => {
    console.log(req.body);
    console.log(req.files);
    var file = uuidv4() + ".wav";
    var filePath = path.join(process.env.SAMPLE_TEMP_DIR, file);
    fs.writeFileSync(filePath, req.files.data.data);
    console.log("Saved to " + filePath);

    var uploadParams = { Bucket: process.env.S3_BUCKET, Key: '', Body: '' };
    var fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = "Samples/" + path.basename(file);

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
        res.json({ "result": "fail", "reason": "failed to upload to S3" });
      } if (data) {
        console.log("Upload Success", data.Location);
        songDb.create({
          title: req.body.title,
          creator: user._id,
          audio: data.Location,
          genre: req.body.genre,
          instrument: req.body.instrument,
          description: req.body.description
        }).then((doc)=>{
          if(doc != null){
            userDb.updateOne({_id: user._id}, {$push: { songs: doc._id}}).then((userDoc)=>{
              console.log(userDoc);
              res.json(doc);

            });
          }else{
            res.json({"result": "fail", "reason": "failed to add to database"});
          }
        });
      }
    });
  }).catch((reason)=>{
      console.log(reason);
      res.json(reason);
  });

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
