import _ from 'lodash'
import queryParser, { getApplicationsFromWheres } from './queryParser'
import { getApps, getBTs } from './getAppModel'
import getColumnFromSelect from './getColumnFromSelect'
import base from './widgetTemplates/base'
import getDimensionsFromWidgets from './getDimensionsFromWidgets'
import uploadDashboard from './uploadDashboard'

export default async ({ query, dashboardName = 'dash-ql', config }) => {
  if (query === '') {
    return { msg: 'No query', type: 'warning' }
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

  const { selects, wheres, queryErrMsg } = queryParser({ query })
  if (queryErrMsg) {
    return { msg: queryErrMsg, type: 'danger' }
  }

  // TODO: maybe this should be a gather data method
  // TODO: only get bt info if in select
  const allApplications = await getApps({ options, baseURL })

  const { applicationNames, errorMsg } = getApplicationsFromWheres({
    wheres,
    allApplications,
  })

  if (errorMsg) {
    return { msg: errorMsg, type: 'error' }
  }

  const bt = await getBTs({ applicationNames, wheres, options, baseURL })

  const data = { bt }

  const widgets = selects.map((s, index) =>
    getColumnFromSelect({
      selects,
      selectIndex: index,
      data,
    }),
  )

  const { height, width } = getDimensionsFromWidgets({ widgets })

  const dashObj = {
    ...base,
    widgetTemplates: _.flatten(widgets),
    name: dashboardName,
    width,
    height,
  }

  const msg = uploadDashboard({ dashObj, options, baseURL })
  return msg
}
