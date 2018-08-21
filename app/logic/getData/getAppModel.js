import rp from 'request-promise'
import Promise from 'bluebird'
import getMetricHierarchy from './getMetricHierarchy'

// returns [{ name, id, description }]
export const getApps = async ({ options, baseURL }) =>
  rp({
    ...options,
    url: `${baseURL}/rest/applications?output=json`,
  })
    .promise()
    .then(data => {
      const parsedData = JSON.parse(data)
      console.log(parsedData)
      return parsedData
    })
    .catch(err => {
      console.log(err)
    })

export const getBTs = async ({ applicationNames, options, baseURL }) => {
  const requestPromises = applicationNames.map(applicationName =>
    Promise.props({
      applicationName,
      data: rp({
        ...options,
        url: `${baseURL}/rest/applications/${applicationName}/business-transactions?output=json`,
      }).promise(),
    }),
  )
  return Promise.all(requestPromises).then(results =>
    results.map(({ applicationName, data }) => {
      const parsedData = JSON.parse(data).map(bt => ({
        ...bt,
        tier: bt.tierName,
      }))

      return { applicationName, bts: parsedData }
    }),
  )
}

export const getTiers = async ({ applicationNames, options, baseURL }) => {
  const requestPromises = applicationNames.map(applicationName =>
    Promise.props({
      applicationName,
      data: rp({
        ...options,
        url: `${baseURL}/rest/applications/${applicationName}/tiers?output=json`,
      }).promise(),
    }),
  )
  return Promise.all(requestPromises).then(results =>
    results.map(({ applicationName, data }) => {
      const parsedData = JSON.parse(data)

      return { applicationName, tiers: parsedData }
    }),
  )
}

// TODO: maybe take tiers as well so that can be more fine-grained
export const getNodes = async ({ applicationNames, options, baseURL }) => {
  const requestPromises = applicationNames.map(applicationName =>
    Promise.props({
      applicationName,
      data: rp({
        ...options,
        url: `${baseURL}/rest/applications/${applicationName}/nodes?output=json`,
      }).promise(),
    }),
  )
  return Promise.all(requestPromises).then(results =>
    results.map(({ applicationName, data }) => {
      const parsedData = JSON.parse(data).map(node => ({
        ...node,
        tier: node.tierName,
      }))
      return { applicationName, data: parsedData }
    }),
  )
}

export const getSEs = async ({ applicationNames, options, baseURL }) => {
  const applicationsWithTiers = await Promise.all(
    applicationNames.map(applicationName =>
      Promise.props({
        applicationName,
        tiers: getMetricHierarchy({
          applicationName,
          metricPath: 'Service Endpoints',
          options,
          baseURL,
        }),
      }),
    ),
  )
  const requestPromises = await Promise.all(
    applicationsWithTiers.map(({ applicationName, tiers }) =>
      Promise.all(
        tiers.map(tier =>
          Promise.props({
            applicationName,
            tier,
            ses: getMetricHierarchy({
              applicationName,
              metricPath: `Service Endpoints|${tier}`,
              options,
              baseURL,
            }),
          }),
        ),
      ),
    ),
  )

  return requestPromises
}
