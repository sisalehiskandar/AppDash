import flattenAppElements from './flattenAppElements'

export default ({ scopingSelect, args, data }) => {
  let healthDatas
  if (scopingSelect === 'application') {
    healthDatas = data.applications.map(({ name }) => ({
      applicationName: name,
      entityName: name,
    }))
  } else {
    const elements = flattenAppElements({
      applications: data.applications,
      key: `${scopingSelect}s`,
    })
    if (scopingSelect === 'bt') {
      healthDatas = elements.map(
        ({
          applicationName,
          data: { internalName, tier, entryPointType },
        }) => ({
          applicationName,
          entityName: internalName,
          scopingEntityName: tier,
          subtype: entryPointType,
        }),
      )
    } else if (scopingSelect === 'se' && args) {
      healthDatas = elements.map(({ applicationName, data: { name } }) => ({
        applicationName,
        entityName:
          args === 'art'
            ? `z_Service Endpoint - Response Time - ${name}`
            : `z_Service Endpoint - Errors - ${name}`,
        scopingEntityName: null,
        subtype: null,
      }))
    } else if (scopingSelect === 'tier') {
      healthDatas = elements.map(({ applicationName, data: { name } }) => ({
        applicationName,
        entityName: name,
        scopingEntityName: null,
        subtype: null,
      }))
    } else if (scopingSelect === 'node') {
      healthDatas = elements.map(
        ({ applicationName, data: { name, tier } }) => ({
          applicationName,
          entityName: name,
          scopingEntityName: tier,
          subtype: null,
        }),
      )
    }
  }
  return { healthDatas }
}
