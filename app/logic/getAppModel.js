import rp from 'request-promise'
import Promise from 'bluebird'

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

export const getTiers = async ({ applicationName, options, baseURL }) =>
  rp({
    ...options,
    url: `${baseURL}/rest/applications/${applicationName}/tiers?output=json`,
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

export const getBTs = async ({ appNames, options, baseURL }) => {
  const requestPromises = appNames.map(appName =>
    Promise.props({
      appName,
      data: rp({
        ...options,
        url: `${baseURL}/rest/applications/${appName}/business-transactions?output=json`,
      }).promise(),
    }),
  )
  return Promise.all(requestPromises).then(results =>
    results.map(({ appName, data }) => {
      const parsedData = JSON.parse(data).map(bt => ({
        ...bt,
        tier: bt.tierName,
      }))

      return { appName, bts: parsedData }
    }),
  )
}
