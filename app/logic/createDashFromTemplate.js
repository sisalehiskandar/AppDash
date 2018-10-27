import fs from 'fs'
import path from 'path'
import _ from 'lodash'

export default ({ data, template, dashboardName, selects }) => {
  const file = fs.readFileSync(
    path.resolve(`./dashboardTemplates/${template}.json`),
    'utf8',
  )

  const scopingSelect = selects[0].value
  let dataList
  if (scopingSelect === 'application') {
    dataList = data.applications.map(({ name }) => name)
  }

  const base = { ...JSON.parse(file), widgetTemplates: [] }
  const singleHeight = base.height
  const stringRegex = new RegExp(`\\$${scopingSelect.toUpperCase()}`, 'gi')
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
  const dashboard = {
    ..._.omit(base, 'file'),
    widgetTemplates: _.flatten(widgetTemplates),
    name: dashboardName,
    height: dataList.length * singleHeight,
  }
  return dashboard
}
