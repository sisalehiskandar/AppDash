import { getApps, getBTs } from './getAppModel'
import { getApplicationsFromWheres } from './queryParser'

const filterApps = ({ allApplications, wheres = [] }) => {
  let applications = allApplications
  // debugger //eslint-disable-line
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
  console.log(`final length ${applications.length}`)

  return applications
}

export default async ({ selects, wheres, options, baseURL }) => {
  let data = {}
  const firstSelect = selects[0].value
  console.log(firstSelect)

  const allApplications = await getApps({ options, baseURL })

  const { applicationNames, errorMsg } = getApplicationsFromWheres({
    wheres,
    allApplications,
  })

  if (errorMsg) {
    return { errorMsg }
  }

  if (firstSelect === 'bt') {
    const bt = await getBTs({ applicationNames, wheres, options, baseURL })
    data = { bt }
  } else if (firstSelect === 'app' || firstSelect === 'application') {
    data = { applications: filterApps({ allApplications, wheres }) }
  }
  console.log('final data')

  console.log(data)

  return { data }
}
