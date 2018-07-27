import {
  createLabelColumn,
  createMetricColumn,
  createHeader,
} from './createColumn'
import getMetricFromShortcut from './getMetricFromShortcut'
import flattenBTs from './flattenBTs'

const LABELS_WIDTH = 300
const METRICS_WIDTH = 200
const LABEL_ENTITIES = ['bt', 'tier', 'backend']

export default ({ selects, selectIndex, data, x }) => {
  let width
  const select = selects[selectIndex].value
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
    }
    return {
      nextX: x + width,
      column: [
        { ...header, width },
        ...createLabelColumn({ labelTexts, x, width }),
      ],
    }
  }

  // create a metric column
  const { metric } = getMetricFromShortcut(select)
  if (selects[0].value === 'bt') {
    width = METRICS_WIDTH
    const bts = flattenBTs(data.bt)
    const metricWidgetData = bts.map(
      ({ applicationName, bt: { internalName, tier } }) => ({
        applicationName,
        metricPath: `Business Transaction Performance|Business Transactions|${tier}|${internalName}|${metric}`,
        entityName: tier,
      }),
    )

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
}
