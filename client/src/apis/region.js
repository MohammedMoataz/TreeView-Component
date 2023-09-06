//  Region Queries
/**
 * 
 * @returns all regions
 */
export const getAll = async () => {
  let query = `{
    getAll{
      id
      p_id
      region
    }
  }`

  return await fetchApi(query)
}

/**
 * 
 * @param {Number} parentId parent region id
 * @returns all regions that inside in this region
 */
export const getAllByParentId = async (parentId) => {
  let query = `{
    getAllByParentId(parent_id: ${parentId}){
      id
      p_id
      region
    }
  }`

  return await fetchApi(query)
}


//  Region Mutations
/**
 * 
 * @param {String} region name of new region
 * @param {Number} parent_id parent region id
 * @returns the new added region
 */
export const add = async (region, parent_id) => {
  let mutation = `mutation {
    add(
      region: "${region}",
      parent_id: ${parent_id}
    ) {
      id
      p_id
      region
    }
  }`

  return await fetchApi(mutation)
}

/**
 * 
 * @param {String} region region name
 * @param {Number} id region id 
 * @returns if the region updated or not
 */
export const update = async (region, id) => {
  let mutation = `mutation {
    update(
      region: "${region}",
      id: ${id}
    )
  }`

  return await fetchApi(mutation)
}


//  Fetch API Function
/**
 * 
 * @param {String} body a query or mutation passing from user
 * @returns response from server after excuting body - json object
 */
const fetchApi = async (body) => {
  return await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: body })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}