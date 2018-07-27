import labelWidget from './widgetTemplates/label'
import metricWidget from './widgetTemplates/metricValue'
import getMetricDataSeriesTemplates from './widgetTemplates/getMetricDataSeriesTemplates'

export const createLabelColumn = ({ labelTexts, x, width }) => {
  const labels = labelTexts.map((labelText, index) => ({
    ...labelWidget,
    text: labelText,
    width,
    height: 50,
    x,
    y: (index + 1) * labelWidget.height,
    textAlign: 'LEFT',
  }))
  return labels
}

export const createMetricColumn = ({
  metricWidgetData,
  x,
  formatString,
  width,
}) => {
  const metrics = metricWidgetData.map(
    ({ applicationName, metricPath, entityName }, index) => ({
      ...metricWidget,
      dataSeriesTemplates: getMetricDataSeriesTemplates({
        applicationName,
        metricPath,
        entityName,
      }),
      width,
      height: 50,
      x,
      y: (index + 1) * labelWidget.height,
      label: metricWidget.label || formatString,
    }),
  )
  return metrics
}

export const createHeader = ({ labelText, x, width }) => ({
  ...labelWidget,
  text: labelText,
  width,
  height: 50,
  x,
  y: 0,
  textAlign: 'LEFT',
  fontSize: 18,
})
