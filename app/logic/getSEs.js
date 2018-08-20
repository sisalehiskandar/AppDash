import { getSEs } from './getAppModel'
import filterData from './filterData'

export default async ({ applications, wheres = [], options, baseURL }) => {
  const applicationNames = applications.map(({ name }) => name)
  const allSEs = await getSEs({ applicationNames, options, baseURL })

  const filteredSEs = allSEs.map(application =>
    application.map(({ applicationName, tier, ses }) => ({
      applicationName,
      tier,
      ses: filterData({ data: ses, wheres, type: 'se' }),
    })),
  )

  const appsWithSEs = applications.map(app => {
    const ses = filteredSEs.find(seApp => app.name === seApp[0].applicationName)
    return {
      ...app,
      ses,
    }
  })

  return appsWithSEs
}
