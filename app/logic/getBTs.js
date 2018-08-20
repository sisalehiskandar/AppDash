import { getBTs } from './getAppModel'
import filterData from './filterData'

export default async ({ applications, wheres = [], options, baseURL }) => {
  const applicationNames = applications.map(({ name }) => name)
  const allBts = await getBTs({ applicationNames, options, baseURL })

  const filteredBts = allBts.map(({ applicationName, bts }) => ({
    applicationName,
    bts: filterData({ data: bts, wheres, type: 'bt' }),
  }))

  const appsWithBts = applications.map(app => ({
    ...app,
    bts: filteredBts.find(({ applicationName }) => app.name === applicationName)
      .bts,
  }))

  return appsWithBts
}
