const router = require('express').Router();
const userController = require('../../controllers/userController');
const userModel = require("../../models/users");



// Matches with "/api/users"
router.route('/').get(userController.findAll);


// Matches with "/api/users/:id"
router
  .route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
