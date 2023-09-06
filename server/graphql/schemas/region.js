export default {

    //  Region Entity
    Region: `
        scalar Data
        
        type Region {
            id: Int
            p_id: Int
            region: String
        }
    `,

    //  Region Queries
    RegionQueries: `
        getAll: [Region!]!
        getAllByParentId(parent_id: Int!): [Region!]!
    `,

    //  Region Mutations
    RegionMutations: `
        add(region: String!, parent_id: Int!): Region
        update(region: String!, id: Int!): Boolean
    `
}
