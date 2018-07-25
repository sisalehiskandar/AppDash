import _ from 'lodash'

export default input => {
  const flattenedBTs = input.map(({ applicationName, bts }) => {
    const list = bts.map(bt => ({
      applicationName,
      bt,
    }))
    return list
  })
  return _.flatten(flattenedBTs)
}
