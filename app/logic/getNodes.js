import { getNodes } from './getAppModel'
import filterData from './filterData'

export default async ({ applications, wheres = [], options, baseURL }) => {
  const applicationNames = applications.map(({ name }) => name)
  const all = await getNodes({ applicationNames, options, baseURL })

  const filteredList = all.map(({ applicationName, data }) => ({
    applicationName,
    nodes: filterData({ data, wheres, type: 'node' }),
  }))

  const applicationsWithData = applications.map(app => ({
    ...app,
    nodes: filteredList.find(
      ({ applicationName }) => app.name === applicationName,
    ).nodes,
  }))

  return applicationsWithData
}
