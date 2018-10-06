import {
  createLabelColumn,
  createMetricColumn,
  createHeader,
  createHealthColumn,
} from './createColumn'
import getMetricFromShortcut from './getMetricFromShortcut'
import getLabelTexts from './getLabelTexts'
import getHealthDatas from './getHealthDatas'
import getMetricWidgetData from './getMetricWidgetData'

const LABELS_WIDTH = 300
const METRICS_WIDTH = 200
const HEALTH_WIDTH = 80
const LABEL_ENTITIES = ['application', 'bt', 'tier', 'node', 'backend', 'se']

export default ({ selects, selectIndex, data, x }) => {
  let width
  const select = selects[selectIndex].value
  const scopingSelect = selects[0].value
  const { as, args } = selects[selectIndex]

  // create the header
  const header = createHeader({
    labelText: as || args || getMetricFromShortcut(select).metric,
    x,
    textAlign: select === 'health' ? 'CENTER' : null,
  })

  // create a label column
  if (LABEL_ENTITIES.includes(select)) {
    width = LABELS_WIDTH
    const { labelTexts } = getLabelTexts({ select, data })
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
    const { healthDatas } = getHealthDatas({ scopingSelect, args, data })
    return {
      nextX: x + width,
      column: [
        { ...header, width },
        ...createHealthColumn({
          healthDatas,
          type: scopingSelect,
          policy: !!args,
          x,
          width,
        }),
      ],
    }
  }

  // otherwise, create a metric column
  const { metric } = getMetricFromShortcut(select)
  width = METRICS_WIDTH
  const { metricWidgetData } = getMetricWidgetData({
    scopingSelect,
    data,
    metric,
  })

  return {
    nextX: x + width,
    column: [
      { ...header, width, textAlign: 'RIGHT' },
      ...createMetricColumn({
        metricWidgetData,
        x,
        formatString: getMetricFromShortcut(select).formatString,
        width,
      }),
    ],
  }
}
