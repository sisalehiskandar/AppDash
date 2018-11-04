import { getApps } from './getAppModel'
import filterData from './filterData'
import getBTs from './getBTs'
import getSEs from './getSEs'
import getTiers from './getTiers'
import getNodes from './getNodes'

export default async ({ selects, wheres, options, baseURL }) => {
  let data = {}
  const firstSelect = selects[0].value

  const allApplications = await getApps({ options, baseURL })

  // if it failed
  if (allApplications.errorMsg) {
    return allApplications
  }

  const filteredApplications = filterData({
    data: allApplications,
    wheres,
    type: 'application',
  })
  data = {
    applications: filteredApplications.map(({ name, id }) => ({
      name,
      id,
    })),
  }

  // TODO: should probably move these into here as they're pretty much all the same
  if (firstSelect === 'bt') {
    data.applications = await getBTs({
      applications: data.applications,
      wheres,
      options,
      baseURL,
    })
  } else if (firstSelect === 'se') {
    data.applications = await getSEs({
      applications: data.applications,
      wheres,
      options,
      baseURL,
    })
  } else if (firstSelect === 'tier') {
    data.applications = await getTiers({
      applications: data.applications,
      wheres,
      options,
      baseURL,
    })
  } else if (firstSelect === 'node') {
    data.applications = await getNodes({
      applications: data.applications,
      wheres,
      options,
      baseURL,
    })
  }

  return { data }
}
