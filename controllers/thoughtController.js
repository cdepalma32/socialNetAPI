// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Create an aggregate function to get the number of thoughts overall
const thoughtCount = async () => {
    const numberOfThoughts = await Thought.count(); // changed .aggregate to .count
    return numberOfThoughts;
}

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().sort({ createdAt: -1 });
            return res.json(thoughts);
        } catch (err) {
            console.log('Error fetching thoughts:', error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .lean();

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ thought });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a thought and remove it from the user
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought deleted, but no user found' });
            }
            
            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            // Assuming req.body contains new reaction data, add a new reaction to the thought's reactions array
            thought.reactions.push(req.body);
            
            // Save the updated thought with the new reaction
            const updatedThought = await thought.save();
    
            // Return the updated thought as JSON
            return res.json(updatedThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
    
                    }
                    
                    