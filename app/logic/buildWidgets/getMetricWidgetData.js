import flattenAppElements from './flattenAppElements'

export default ({ scopingSelect, data, metric }) => {
  let metricWidgetData
  if (scopingSelect === 'bt') {
    const bts = flattenAppElements({
      applications: data.applications,
      key: 'bts',
    })
    metricWidgetData = bts.map(
      ({ applicationName, data: { internalName, tier } }) => ({
        applicationName,
        metricPath: `Business Transaction Performance|Business Transactions|${tier}|${internalName}|${metric}`,
        entityName: tier,
      }),
    )
  } else if (scopingSelect === 'tier') {
    const tiers = flattenAppElements({
      applications: data.applications,
      key: 'tiers',
    })
    metricWidgetData = tiers.map(({ applicationName, data: { name } }) => ({
      applicationName,
      metricPath: `Overall Application Performance|${name}|${metric}`,
      entityName: name,
    }))
  } else if (scopingSelect === 'node') {
    const elements = flattenAppElements({
      applications: data.applications,
      key: 'nodes',
    })
    metricWidgetData = elements.map(
      ({ applicationName, data: { tier, name } }) => ({
        applicationName,
        metricPath: `Overall Application Performance|${tier}|Individual Nodes|${name}|${metric}`,
        entityName: tier,
      }),
    )
  } else if (scopingSelect === 'se') {
    const ses = flattenAppElements({
      applications: data.applications,
      key: 'ses',
    })
    metricWidgetData = ses.map(({ applicationName, data: { tier, name } }) => ({
      applicationName,
      metricPath: `Service Endpoints|${tier}|${name}|${metric}`,
      entityName: tier,
    }))
  } else if (scopingSelect === 'application') {
    const { applications } = data
    metricWidgetData = applications.map(({ name }) => ({
      applicationName: name,
      metricPath: `Overall Application Performance|${metric}`,
      entityName: name,
      entityType: 'APPLICATION',
    }))
  }
  return { metricWidgetData }
}
