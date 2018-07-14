import labelWidget from './widgetTemplates/label'
import metricWidget from './widgetTemplates/metricValue'
import getMetricDataSeriesTemplates from './widgetTemplates/getMetricDataSeriesTemplates'

export const createLabelColumn = ({ labelTexts, x }) => {
  const labels = labelTexts.map((labelText, index) => ({
    ...labelWidget,
    text: labelText,
    width: 300,
    height: 50,
    x,
    y: (index + 1) * labelWidget.height,
    textAlign: 'LEFT',
  }))
  return labels
}

export const createMetricColumn = ({ metricWidgetData, x, formatString }) => {
  const metrics = metricWidgetData.map(
    ({ applicationName, metricPath, entityName }, index) => ({
      ...metricWidget,
      dataSeriesTemplates: getMetricDataSeriesTemplates({
        applicationName,
        metricPath,
        entityName,
      }),
      width: 300,
      height: 50,
      x,
      y: (index + 1) * labelWidget.height,
      label: metricWidget.label || formatString,
    }),
  )
  return metrics
}

export const createHeader = ({ labelText, x }) => ({
  ...labelWidget,
  text: labelText,
  width: 300,
  height: 50,
  x: x * 300,
  y: 0,
  textAlign: 'LEFT',
  fontSize: 18,
})
