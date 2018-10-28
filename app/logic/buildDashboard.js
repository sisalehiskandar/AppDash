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
import createDashFromTemplate from './createDashFromTemplate'

export default async ({
  query,
  mode,
  template,
  stacked,
  dashboardName = 'AppDash',
  config,
}) => {
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

  let dashboards
  if (mode === 'TEMPLATE') {
    dashboards = createDashFromTemplate({
      data,
      template,
      stacked,
      dashboardName,
      selects,
    })
  } else if (mode === 'GRID') {
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

    dashboards = [
      {
        ...base,
        widgetTemplates: _.flatten(widgets),
        name: dashboardName,
        width,
        height,
      },
    ]
  }

  // upload to the controller
  console.log(dashboards)
  const msg = uploadDashboard({ dashboards, options, baseURL })

  return msg
}
