import _ from 'lodash'
import getConnectionDetails from './getConnectionDetails'
import queryParser from './queryParser'
import getData from './getData/getData'
import getColumnFromSelect from './buildWidgets/getColumnFromSelect'
import base from './buildWidgets/widgetTemplates/base'
import getDimensionsFromWidgets from './getDimensionsFromWidgets'
import uploadDashboard from './uploadDashboard'
import flattenAppElements from './buildWidgets/flattenAppElements'
import createSEHRs from './hrs/createSEHRs'

export default async ({ query, dashboardName = 'AppDash', config }) => {
  if (query === '') {
    return { msg: 'No query', type: 'warning' }
  }

  // get rest api connection details
  const { options, baseURL } = getConnectionDetails({ config })

  // parse the query
  const { selects, wheres, queryErrMsg } = queryParser({ query })
  if (queryErrMsg) {
    return { msg: queryErrMsg, type: 'danger' }
  }

  // create a data model
  const { data, errorMsg } = await getData({
    selects,
    wheres,
    options,
    baseURL,
  })

  if (errorMsg) {
    return { msg: errorMsg, type: 'error' }
  }

  // create health rules if necessary
  const scopingSelect = selects[0].value
  if (
    scopingSelect === 'se' &&
    selects.map(({ value }) => value).includes('health')
  ) {
    const elements = flattenAppElements({
      applications: data.applications,
      key: `${scopingSelect}s`,
    })
    const healthArgs = selects
      .filter(({ value }) => value === 'health')
      .map(({ args }) => args)

    const hrs = await createSEHRs({ healthArgs, elements, options, baseURL })
    console.log(hrs)
  }

  // build all the widgetsa
  let x = 0
  const widgets = selects.map((s, index) => {
    const { nextX, column } = getColumnFromSelect({
      selects,
      selectIndex: index,
      data,
      x,
    })
    x = nextX
    return column
  })

  // get how big the dashboard should be
  const { height, width } = getDimensionsFromWidgets({ widgets })

  const dashObj = {
    ...base,
    widgetTemplates: _.flatten(widgets),
    name: dashboardName,
    width,
    height,
  }
  console.log(dashObj)

  // upload to the controller
  const msg = uploadDashboard({ dashObj, options, baseURL })
  return msg
}
