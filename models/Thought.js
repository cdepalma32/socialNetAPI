
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
      
    },

    username: 
        {
        type: String,
        required: true
        }
    ,

    // Array of nested documents created with the reactionSchema
    reactions: [reactionSchema]
  },
    
 
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// creates a virtual property friendCount 
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;

});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;

