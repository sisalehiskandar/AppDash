import fs from 'fs'
import path from 'path'
import _ from 'lodash'

export default ({ data, template, stacked, dashboardName, selects }) => {
  const file = fs.readFileSync(
    path.resolve(`./dashboardTemplates/${template}.json`),
    'utf8',
  )

  const scopingSelect = selects[0].value
  let dataList
  if (scopingSelect === 'application') {
    dataList = data.applications.map(({ name }) => name)
  }
  const stringRegex = new RegExp(`\\$${scopingSelect.toUpperCase()}`, 'gi')

  let dashboard = {}

  // create one stacked dashboard or multiple dashboards
  if (stacked) {
    const base = { ...JSON.parse(file), widgetTemplates: [] }
    const singleHeight = base.height
    const widgetTemplates = dataList.map((value, index) => {
      const widgetsString = file.replace(stringRegex, value)
      const singleWidgetTemplates = JSON.parse(widgetsString).widgetTemplates
      const singleWidgetTemplatesWithHeight = singleWidgetTemplates.map(
        widget => ({
          ...widget,
          y: widget.y + singleHeight * index,
        }),
      )
      return singleWidgetTemplatesWithHeight
    })
    dashboard = [
      {
        ..._.omit(base, 'file'),
        widgetTemplates: _.flatten(widgetTemplates),
        name:
          dataList.length === 1
            ? `${dataList[0]} - ${dashboardName}`
            : dashboardName,
        height: dataList.length * singleHeight,
      },
    ]
  } else {
    dashboard = dataList.map(value => {
      const dashboardString = file.replace(stringRegex, value)
      const dashboardObj = JSON.parse(dashboardString)
      return { ...dashboardObj, name: `${value} - ${dashboardObj.name}` }
    })
  }
  return dashboard
}
