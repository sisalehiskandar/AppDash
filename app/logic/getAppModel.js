import _ from 'lodash'
import rp from 'request-promise'
import { options, baseURL } from './requestOptions'

export const getApps = async () =>
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

export const getTiers = async ({ applicationName }) =>
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

export const getBTs = async ({ applicationName, wheres }) =>
  rp({
    ...options,
    url: `${baseURL}/rest/applications/${applicationName}/business-transactions?output=json`,
  })
    .promise()
    .then(data => {
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
          if (operator === '=') {
            return bt[contextField] === value
          } else if (operator === 'REGEXP') {
            return new RegExp(value, 'i').test(bt[contextField])
          }
          return true
        })
      })
      return filteredData
    })
    .catch(err => {
      console.log(err)
    })
