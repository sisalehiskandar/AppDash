import {
  createLabelColumn,
  createMetricColumn,
  createHeader
} from './createColumn'
import { getApplicationFromWheres } from './queryParser'
import getMetricFromShortcut from './getMetricFromShortcut'

const DEFAULT_WIDTH = 300
const LABEL_ENTITIES = ['bt', 'tier', 'backend']

export default ({ selects, selectIndex, data, wheres }) => {
  const select = selects[selectIndex].value
  const header = createHeader({
    labelText: selects[selectIndex].as || getMetricFromShortcut(select).metric,
    x: selectIndex
  })

  if (LABEL_ENTITIES.includes(select)) {
    // create a label column

    let labelTexts = []
    if (select === 'bt') {
      labelTexts = data.bt.map(({ name }) => name)
    }

    return [
      header,
      ...createLabelColumn({ labelTexts, x: DEFAULT_WIDTH * selectIndex })
    ]
  }
  // create a metric column

  const applicationName = getApplicationFromWheres({ wheres })
  const { metric } = getMetricFromShortcut(select)
  if (selects[0].value === 'bt') {
    const metricWidgetData = data.bt.map(({ internalName, tier }) => ({
      applicationName,
      metricPath: `Business Transaction Performance|Business Transactions|${tier}|${internalName}|${metric}`,
      entityName: tier
    }))

    return [
      header,
      ...createMetricColumn({
        metricWidgetData,
        x: DEFAULT_WIDTH * selectIndex,
        formatString: getMetricFromShortcut(select).formatString
      })
    ]
  }
}
