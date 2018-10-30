import _ from 'lodash'
import templates from './dashboardTemplates/templates'

const getFileJSON = ({ template, savedTemplates = [] }) => {
  const existingTemplate = savedTemplates.find(
    ({ title }) => title === template,
  )
  return existingTemplate
    ? existingTemplate.dashboardJSON
    : JSON.stringify(templates[template])
}

export default ({
  data,
  template,
  stacked,
  dashboardName,
  savedTemplates,
  selects,
}) => {
  const file = getFileJSON({ template, savedTemplates })

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
      return { ...dashboardObj, name: `${value} - ${dashboardName}` }
    })
  }
  return dashboard
}
