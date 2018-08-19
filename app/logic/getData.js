import { getApps } from './getAppModel'
import filterData from './filterData'
import getBTs from './getBTs'

export default async ({ selects, wheres, options, baseURL }) => {
  let data = {}
  const firstSelect = selects[0].value

  const allApplications = await getApps({ options, baseURL })
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

  if (firstSelect === 'bt') {
    data.applications = await getBTs({
      applications: data.applications,
      wheres,
      options,
      baseURL,
    })
  }

  return { data }
}
