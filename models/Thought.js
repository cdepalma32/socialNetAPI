
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create user model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1, 
       // Minimum length of 1 character,
      maxlength: 280 // Maximum length of 280 characters

    },
    createdAt: {
      type: Date,
      default: Date.now
      // DOUBLE CHECK TIMESTAMPS & Use a getter method to format the timestamp on query
    },

    username: 
        {
        type: String,
        required: true
        }
    ,

    // Array of nested documents created with the reactionSchema. TO DO:
    reactions: [reactionSchema]
  },
    
 
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);

// this code snippet creates a virtual property friendCount 
thoughtSchema.virtual('reactionCount').get(function() {
    returnthis.reactions.length;

});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;

