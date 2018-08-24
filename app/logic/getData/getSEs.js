import { getSEs } from './getAppModel'
import filterData from './filterData'

export default async ({ applications, wheres = [], options, baseURL }) => {
  const applicationNames = applications.map(({ name }) => name)
  const allSEs = await getSEs({ applicationNames, options, baseURL })

  const filteredSEs = allSEs.map(({ application: { name, ses } }) => ({
    name,
    ses: filterData({ data: ses, wheres, type: 'se' }),
  }))

  const appsWithSEs = applications.map(app => {
    const { ses } = filteredSEs.find(seApp => app.name === seApp.name)
    return {
      ...app,
      ses,
    }
  })

  return appsWithSEs
}
