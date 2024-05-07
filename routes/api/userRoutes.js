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
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);



// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend);



module.exports = router;

