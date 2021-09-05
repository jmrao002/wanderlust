const express = require("express");
// import the apolloServer class and middleware
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
// use the typedefs and resolvers for the graphql schema
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// create new instance of an apollo server with graphql schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // add content so data from authMiddleware function can pass data to our resolver functions
  context: authMiddleware,
});

// update express.js to use apollo server 
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// open the two servers for use
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌎  ==> API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});