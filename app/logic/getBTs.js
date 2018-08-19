import { getBTs } from './getAppModel'
import filterData from './filterData'

export default async ({ applications, wheres = [], options, baseURL }) => {
  const appNames = applications.map(({ name }) => name)
  const allBts = await getBTs({ appNames, options, baseURL })

  const filteredBts = allBts.map(({ appName, bts }) => ({
    appName,
    bts: filterData({ data: bts, wheres, type: 'bt' }),
  }))

  const appsWithBts = applications.map(app => ({
    ...app,
    bts: filteredBts.find(({ appName }) => app.name === appName).bts,
  }))

  return appsWithBts
}
