import {
  createLabelColumn,
  createMetricColumn,
  createHeader,
  createHealthColumn,
} from './createColumn'
import getMetricFromShortcut from './getMetricFromShortcut'
import flattenBTs from './flattenBTs'

const LABELS_WIDTH = 300
const METRICS_WIDTH = 200
const HEALTH_WIDTH = 50
const LABEL_ENTITIES = ['app', 'bt', 'tier', 'backend', 'se']

export default ({ selects, selectIndex, data, x }) => {
  let width
  const select = selects[selectIndex].value
  const scopingSelect = selects[0].value

  // create the header
  const header = createHeader({
    labelText: selects[selectIndex].as || getMetricFromShortcut(select).metric,
    x,
  })

  // create a label column
  if (LABEL_ENTITIES.includes(select)) {
    width = LABELS_WIDTH
    let labelTexts = []
    if (select === 'bt') {
      const bts = flattenBTs(data.bt)
      labelTexts = bts.map(({ bt: { name } }) => name)
    } else if (select === 'app') {
      labelTexts = data.applications.map(({ name }) => name)
    }
    return {
      nextX: x + width,
      column: [
        { ...header, width },
        ...createLabelColumn({ labelTexts, x, width }),
      ],
    }
  }

  // create a health column
  if (select === 'health') {
    width = HEALTH_WIDTH
    let healthDatas = []
    if (scopingSelect === 'bt') {
      const bts = flattenBTs(data.bt)
      healthDatas = bts.map(
        ({ applicationName, bt: { internalName, tier, entryPointType } }) => ({
          applicationName,
          entityName: internalName,
          scopingEntityName: tier,
          subtype: entryPointType,
        }),
      )
    } else if (scopingSelect === 'app') {
      healthDatas = data.applications.map(({ name }) => ({
        applicationName: name,
        entityName: name,
      }))
    }
    return {
      nextX: x + width,
      column: [
        { ...header, width },
        ...createHealthColumn({ healthDatas, type: scopingSelect, x, width }),
      ],
    }
  }

  // otherwise, create a metric column
  const { metric } = getMetricFromShortcut(select)

  width = METRICS_WIDTH
  let metricWidgetData
  if (scopingSelect === 'bt') {
    const bts = flattenBTs(data.bt)
    metricWidgetData = bts.map(
      ({ applicationName, bt: { internalName, tier } }) => ({
        applicationName,
        metricPath: `Business Transaction Performance|Business Transactions|${tier}|${internalName}|${metric}`,
        entityName: tier,
      }),
    )
  } else if (scopingSelect === 'app' || scopingSelect === 'application') {
    const { applications } = data
    metricWidgetData = applications.map(({ name }) => ({
      applicationName: name,
      metricPath: `Overall Application Performance|${metric}`,
      entityName: name,
      entityType: 'APPLICATION',
    }))
  }

  return {
    nextX: x + width,
    column: [
      { ...header, width: METRICS_WIDTH, textAlign: 'RIGHT' },
      ...createMetricColumn({
        metricWidgetData,
        x,
        formatString: getMetricFromShortcut(select).formatString,
        width,
      }),
    ],
  }
}
