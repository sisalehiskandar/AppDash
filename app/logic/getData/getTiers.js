import { getTiers } from './getAppModel'
import filterData from './filterData'

export default async ({ applications, wheres = [], options, baseURL }) => {
  const applicationNames = applications.map(({ name }) => name)
  const allTiers = await getTiers({ applicationNames, options, baseURL })

  const filteredTiers = allTiers.map(({ applicationName, tiers }) => ({
    applicationName,
    tiers: filterData({ data: tiers, wheres, type: 'tier' }),
  }))

  const appsWithTiers = applications.map(app => ({
    ...app,
    tiers: filteredTiers.find(
      ({ applicationName }) => app.name === applicationName,
    ).tiers,
  }))

  return appsWithTiers
}
