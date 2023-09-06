import db from '../../database/database.js'

const REGION = db.region

export default {

    //  Region Queries
    /**
     * 
     * @param {Number} args parent region id
     * @returns all regions whose parent region id = parent_id, except the 'root' record witch its id = p_id = 1
     */
    getAllByParentId: async (args, req) => {
        return await REGION.findAll({
            where: { p_id: args.parent_id }
        })
            .then(res => res
                .filter(region => region.dataValues.id > 1)
                .map(region => region.dataValues))
            .catch(err => console.log(err))
    },

    /**
     * 
     * @returns all regions except the 'root' record witch its id = p_id = 1
     */
    getAll: async () => {
        return await REGION.findAll()
            .then(res => res
                .filter(region => region.dataValues.id > 1)
                .map(region => region.dataValues))
            .catch(err => err)
    },


    /* Region Mutations */
    /**
     * 
     * @param {Object} args - data of the new region
     * @param {Number} args.parent_id - new region's parent id
     * @param {String} args.region - new region name
     * @returns new added region
     */
    add: async (args, req) => {
        let parent_id = args.parent_id
        let region = args.region.trim()

        const new_region = new REGION({
            p_id: parent_id,
            region: region
        })

        return await new_region.save()
            .catch(err => console.error(err))
    },

    /**
     * 
     * @param {Object} args - data of the region to be updated
     * @param {Number} args.id - region id
     * @param {String} args.region - region name
     * @returns if region updated or not
     */
    update: async (args, req) => {
        let id = args.id
        let region = args.region.trim()

        let isUpdated = await REGION.update({
            region: region
        }, {
            where: { id: id }
        })
            .catch(err => console.error(err))

        return isUpdated !== 0
    }

}
