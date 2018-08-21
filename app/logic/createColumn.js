import labelWidget from './widgetTemplates/label'
import metricWidget from './widgetTemplates/metricValue'
import healthList from './widgetTemplates/healthList'
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
    ({ applicationName, metricPath, entityName, entityType }, index) => ({
      ...metricWidget,
      dataSeriesTemplates: getMetricDataSeriesTemplates({
        applicationName,
        metricPath,
        entityName,
        entityType,
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

const typesToEntityType = {
  application: 'APPLICATION',
  bt: 'BUSINESS_TRANSACTION',
  tier: 'APPLICATION_COMPONENT',
  node: 'APPLICATION_COMPONENT_NODE',
}

export const createHealthColumn = ({ healthDatas, type, x, width }) =>
  healthDatas.map(
    ({ applicationName, entityName, scopingEntityName, subtype }, index) => {
      const entityType = typesToEntityType[type]
      const scopingEntityType = ['bt', 'node'].includes(type)
        ? 'APPLICATION_COMPONENT'
        : null
      return {
        ...healthList,
        width,
        x,
        y: (index + 1) * healthList.height,
        entityType,
        applicationReference: {
          ...healthList.applicationReference,
          applicationName,
          entityName: applicationName,
        },
        entityReferences: [
          {
            ...healthList.entityReferences[0],
            applicationName,
            entityType,
            entityName: entityName || applicationName,
            scopingEntityType,
            scopingEntityName,
            subtype,
          },
        ],
      }
    },
  )
