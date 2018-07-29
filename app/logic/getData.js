import { getApps, getBTs } from './getAppModel'

const filterApps = ({ allApplications, wheres = [] }) => {
  let applications = allApplications
  wheres.forEach(({ field, operator, value }) => {
    if (field === 'app' || field === 'application') {
      applications = applications.filter(({ name }) => {
        if (operator === 'EQUALS') {
          return name === value
        } else if (operator === 'REGEXP') {
          return new RegExp(value, 'i').test(name)
        } else {
          return true
        }
      })
    }
  })

  return applications
}

export default async ({ selects, wheres, options, baseURL }) => {
  let data = {}
  const firstSelect = selects[0].value

  const allApplications = await getApps({ options, baseURL })
  const fileteredApplicationNames = filterApps({ allApplications, wheres }).map(
    ({ name }) => name,
  )

  if (firstSelect === 'bt') {
    const bt = await getBTs({
      applicationNames: fileteredApplicationNames,
      wheres,
      options,
      baseURL,
    })
    data = { bt }
  } else if (firstSelect === 'app' || firstSelect === 'application') {
    data = { applications: filterApps({ allApplications, wheres }) }
  }

  return { data }
}
