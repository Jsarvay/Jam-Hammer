const router = require('express').Router();
const userController = require('../../controllers/userController');
const userModel = require("../../models/users");
const userAuth = require("../../utils/userAuth");
const jimp = require("jimp");
const fs = require("fs");
var path = require("path");
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');



const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1"
});


function getCurrentUser(req, res) {
  userAuth.authUser(req).then((user) => {
    userModel.findById(user._id).populate('songs').then((userwithSongs) => {
      res.json(userwithSongs);
    }).catch((err) => {
      res.json(err);
    })
  }).catch((err) => {
    res.json(err);
  })
};

function updateProfilePicture(req, res) {
  var user = userAuth.authUser(req).then((user) => {
    console.log(req.body);
    console.log(req.files);
    var uuidName = uuidv4();
    var file = uuidName + req.files.picture.name.substring(req.files.picture.name.lastIndexOf("."));
    var filePath = path.join(process.env.SAMPLE_TEMP_DIR, file);
    fs.writeFileSync(filePath, req.files.picture.data);
    console.log("Saved to " + filePath);
    jimp.read(filePath, (err, pic) => {
      if (err) {
        res.json({ "result": "fail", "reason": "failed to load file" });
      }
      var fixedName = uuidName + "_fixed.png";
      var fixedPath = path.join(process.env.SAMPLE_TEMP_DIR, fixedName);
      pic.resize(512, 512).writeAsync(fixedPath).then((jimp) => {

        var uploadParams = { Bucket: process.env.S3_BUCKET, Key: '', Body: '' };
        var fileStream = fs.createReadStream(fixedPath);
        fileStream.on('error', function (err) {
          console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        uploadParams.Key = "ProfilePictures/" + path.basename(uuidName + ".png");

        // call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, function (err, data) {
          if (err) {
            console.log("Error", err);
            res.json({ "result": "fail", "reason": "failed to upload to S3" });
          } if (data) {
            console.log("Upload Success", data.Location);
            userModel.updateOne({ _id: user._id }, { profilePicture: uuidName }).then((doc) => {
              console.log(doc);
              res.json(doc);
            })
          }
        });
      });

    });
  });
}


// Matches with "/api/users"
router.route('/').get(getCurrentUser);

// Matches with "/api/users/:id"
router
  .route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

router.route("/profile").post(updateProfilePicture);

module.exports = router;
