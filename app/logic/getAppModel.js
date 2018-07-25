import _ from 'lodash'
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

export const getBTs = async ({
  applicationNames,
  wheres,
  options,
  baseURL,
}) => {
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
      let filteredData = parsedData
      const filters = _.intersection(wheres.map(({ field }) => field), [
        'bt',
        'tier',
      ])

      filters.forEach(filter => {
        const { field, operator, value } = wheres.find(
          where => where.field === filter,
        )
        const contextField = field === 'bt' ? 'name' : field
        filteredData = filteredData.filter(bt => {
          if (operator === 'EQUALS') {
            return bt[contextField] === value
          } else if (operator === 'REGEXP') {
            return new RegExp(value, 'i').test(bt[contextField])
          }
          return true
        })
      })
      return { applicationName, bts: filteredData }
    }),
  )
}
