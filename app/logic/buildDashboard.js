import _ from 'lodash'
import queryParser, { getApplicationFromWheres } from './queryParser'
import { getBTs } from './getAppModel'
import getColumnFromSelect from './getColumnFromSelect'
import base from './widgetTemplates/base'
import createDashboard from './createDashboard'

export default async ({ query, dashboardName = 'dash-ql', config }) => {
  if (query === '') {
    return { msg: 'No query', type: 'warning' }
  } else if (query === 'test') {
    query = `SELECT bt, art AS "Response Time", cpm, epm FROM applications WHERE application = "2075ICE.PREPROD" AND bt REGEXP "AdaptiveAuthentication"`
  }

  const {
    host,
    username,
    password,
    account = 'customer1',
    port = 80,
    https = true,
  } = config

  if (!host || !username || !password) {
    return {
      msg: 'Please add your controller info to Config first',
      type: 'warning',
    }
  }
  const baseURL = `${https ? 'https' : 'http'}://${host}/controller`
  const options = {
    url: `${baseURL}`,
    port,
    auth: {
      user: `${username}@${account}`,
      pass: password,
      sendImmediately: true,
    },
  }

  const { selects, wheres } = queryParser({ query })

  // TODO: maybe this should be a gather data method
  // TODO: only get bt info if in select
  const { applicationName, errorMsg } = getApplicationFromWheres({ wheres })

  if (errorMsg) {
    return { msg: errorMsg, type: 'error' }
  }
  const bt = await getBTs({ applicationName, wheres, options, baseURL })

  const data = { bt }
  const widgets = selects.map((s, index) =>
    getColumnFromSelect({
      selects,
      selectIndex: index,
      data,
      wheres,
    }),
  )

  const dashObj = {
    ...base,
    widgetTemplates: _.flatten(widgets),
    name: dashboardName,
    width: 1200,
  }

  const msg = createDashboard({ dashObj, options, baseURL })
  return msg
}
