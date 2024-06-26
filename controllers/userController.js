const { Thought, User } = require('../models');


module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts'); // added populate function, to populate the thoughts field .. originally had users!
      res.json(users);
    } catch (err) {
      console.log('cant get all users', err)
      res.status(500).json(err);
    }
  },

  // Get a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log('cant get single user', err)
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body }, // replaces everything that is currently set in the db
        { runValidators: true, new: true } // explicit about validating data that is being set, running the validators against it.
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a friend
    async createFriend(req, res) {
      try {
        console.log('Request Body:', req.body); // Log the request body to check if friendId is being sent correctly
    
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
    
        console.log('Updated User:', user); // Log the updated user to see if the friendId was successfully added
    
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
    
        res.json(user);
      } catch (err) {
        console.error('Error creating friend:', err); // Log any errors that occur during the process
        res.status(500).json(err);
      }
    },

      // Delete a friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }}, 
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  }











