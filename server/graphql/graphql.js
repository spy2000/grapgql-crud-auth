const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers")
const typeDefs = require("./typeDefs")

exports.startApolloServer = async (app) => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context : (req) => {
            return req}
    });

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })
}

// module.exports = {startApolloServer}
