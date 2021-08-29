const { Thought, User } = require("../models");

const thoughtController = {
  // get all
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get user by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No ID found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //add user
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No ID found" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  //   //update
  //   updateThought({ params, body }, res) {
  //     Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
  //       new: true,
  //       runValidators: true,
  //     })
  //       .then((thoughtData) => {
  //         if (!thoughtData) {
  //           res.status(404).json({ message: "No ID found" });
  //           return;
  //         }
  //         res.json(thoughtData);
  //       })
  //       .catch((err) => res.status(400).json(err));
  //   },

  //remove
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No ID found" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No ID found" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No ID found!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },
};
