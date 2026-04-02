import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
async function init() {
    const app = express()
    app.use(express.json())
    const PORT = process.env.PORT || 8000
    const apolloServer = new ApolloServer({
        typeDefs: `type Query {
            hello: String
            say(name:String): String
        }`,
        resolvers: {
            Query: {
                hello: () => 'Hello, world!',
                say: (_,{name}:{ name: string }) => `Hello, ${name}!`
            }
        }
    });
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
init();