import { buildSchema } from "graphql"

import regionSchema from './schemas/region.js'

export default buildSchema(`
    ${regionSchema.Region}

    type RootQuery {
        ${regionSchema.RegionQueries}
    }
    
    type RootMutation {
        ${regionSchema.RegionMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
