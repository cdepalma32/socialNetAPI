// miniproject has answer to use reaction schema, even though it is not imported --- very similar

const { Schema, Types } = require('mongoose');

// Schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // changed from new Types.ObjectId() to Schema.Types....
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280 // Maximum length of 280 characters,
    },

    username: 
        {
        type: String,
        required: true
        }
    ,
    
    createdAt: { 
            type: Date,
            default: Date.now
            
      } 
    
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  });


module.exports = reactionSchema;
