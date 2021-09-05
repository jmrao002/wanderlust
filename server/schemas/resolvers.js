const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// create the functions that fulfill the queries defined in typeDefs
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // check if there is a matching user
      if (context.user) {
        // check data saved against the user
        const userData = await User.findOne({})
          .select("-__v -password")
          .populate("books");
        // get and return the user's saved books
        return userData;
      }

      throw new AuthenticationError("You need to log in to see this page!");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials, try again.");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      if (context.user) {
        //   const savedBook = await Book.create({ ...args, username: context.user.username });

        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.input } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
