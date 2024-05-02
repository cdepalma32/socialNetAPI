const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
} = require('../../controllers/userController.js');

// api/users **
// doesn't have a user id until after created (hence, post)
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
// for getting all and creating - you don't yet use/have the need for a user ID
// hence, the formatted router operations, below
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;

