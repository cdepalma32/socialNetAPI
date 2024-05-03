const router = require('express').Router();
const { // gets functions from the controllers
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser, 
    createFriend,
    deleteFriend

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



// /api/users/:userId/friends/:friendId
// add POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
// why does friends request friend id when that's not what we do for user???
router
.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend);



module.exports = router;

