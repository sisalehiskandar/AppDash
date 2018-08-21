import flattenAppElements from './flattenAppElements'

export default ({ scopingSelect, data }) => {
  let healthDatas
  if (scopingSelect === 'bt') {
    const bts = flattenAppElements({
      applications: data.applications,
      key: 'bts',
    })
    healthDatas = bts.map(
      ({ applicationName, data: { internalName, tier, entryPointType } }) => ({
        applicationName,
        entityName: internalName,
        scopingEntityName: tier,
        subtype: entryPointType,
      }),
    )
  } else if (scopingSelect === 'tier') {
    const tiers = flattenAppElements({
      applications: data.applications,
      key: 'tiers',
    })
    healthDatas = tiers.map(({ applicationName, data: { name } }) => ({
      applicationName,
      entityName: name,
      scopingEntityName: null,
      subtype: null,
    }))
  } else if (scopingSelect === 'node') {
    const elements = flattenAppElements({
      applications: data.applications,
      key: 'nodes',
    })
    healthDatas = elements.map(({ applicationName, data: { name, tier } }) => ({
      applicationName,
      entityName: name,
      scopingEntityName: tier,
      subtype: null,
    }))
  } else if (scopingSelect === 'application') {
    healthDatas = data.applications.map(({ name }) => ({
      applicationName: name,
      entityName: name,
    }))
  }
  return { healthDatas }
}
