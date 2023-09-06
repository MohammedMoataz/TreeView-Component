import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { graphqlHTTP } from 'express-graphql'

import schema from './graphql/schema.js'
import graphQlResolver from './graphql/resolver.js'
import db from './database/database.js'

config()

const PORT = process.env.PORT || 4001
const app = express()

app.use(cors())

db.sequelize.authenticate()
    .then(() => app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`)))
    .catch(err => console.log('ERROR: ', err))

//  http://localhost:4000/graphql/
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: graphQlResolver,
    graphiql: true
}))

//  http://localhost:4000/
app.get('/', (req, res) => res.send(`<h1>Go to <a href="http://localhost:${PORT}/graphql/">GraphQl<a/></h1>`))
