const router = require('express').Router();
const userController = require('../../controllers/userController');
const userModel = require("../../models/users");
const userAuth = require("../../utils/userAuth");

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
}


// Matches with "/api/users"
router.route('/').get(getCurrentUser);

// Matches with "/api/users/:id"
router
  .route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
