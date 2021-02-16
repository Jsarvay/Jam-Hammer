const router = require('express').Router();
const userController = require('../../controllers/userController');
const userModel = require("../../models/users");
const userAuth = require("../../utils/userAuth");
const jimp = require("jimp");

function getCurrentUser(req, res){
  userAuth.authUser(req).then((user)=>{
    userModel.findById(user._id).populate('songs').then((userwithSongs) => {
      res.json(userwithSongs);
    }).catch((err)=>{
      res.json(err);
    })
  }).catch((err)=>{
    res.json(err);
  })
};

function updateProfilePicture(req, res){
  var user = authUtil.authUser(req).then((user) => {
    console.log(req.body);
    console.log(req.files);
    var file = uuidv4() + req.files;
    var filePath = path.join(process.env.SAMPLE_TEMP_DIR, file);
    fs.writeFileSync(filePath, req.files.data.data);
    console.log("Saved to " + filePath);

    var uploadParams = { Bucket: process.env.S3_BUCKET, Key: '', Body: '' };
    var fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = "Profile/" + path.basename(file);

    // call S3 to retrieve upload file to specified bucket
    // s3.upload(uploadParams, function (err, data) {

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
