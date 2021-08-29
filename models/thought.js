const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
const { dateFormat } = require("date-fns");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 200,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal, "MM/dd/yyyy"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.lenght;
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
