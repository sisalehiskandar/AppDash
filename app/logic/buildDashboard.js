import _ from 'lodash'
import queryParser from './queryParser'
import getData from './getData/getData'
import getColumnFromSelect from './buildWidgets/getColumnFromSelect'
import base from './buildWidgets/widgetTemplates/base'
import getDimensionsFromWidgets from './getDimensionsFromWidgets'
import uploadDashboard from './uploadDashboard'

export default async ({ query, dashboardName = 'AppDash', config }) => {
  if (query === '') {
    return { msg: 'No query', type: 'warning' }
  }

  const {
    host,
    username,
    password,
    account = 'customer1',
    port = 80,
    https = false,
  } = config

  const filteredAccount = account === '' ? 'customer1' : account

  if (!host || !username || !password) {
    return {
      msg: 'Please add your controller info to Config first',
      type: 'warning',
    }
  }
  const baseURL = `${https ? 'https' : 'http'}://${host}${
    port !== 80 ? `:${port}` : ''
  }/controller`
  console.log(`baseURL - ${baseURL}`)

  const options = {
    url: `${baseURL}`,
    port,
    auth: {
      user: `${username}@${filteredAccount}`,
      pass: password,
      sendImmediately: true,
    },
  }

  const { selects, wheres, queryErrMsg } = queryParser({ query })
  if (queryErrMsg) {
    return { msg: queryErrMsg, type: 'danger' }
  }

  const { data, errorMsg } = await getData({
    selects,
    wheres,
    options,
    baseURL,
  })
  console.log(data)

  if (errorMsg) {
    return { msg: errorMsg, type: 'error' }
  }

  let x = 0
  const widgets = selects.map((s, index) => {
    const { nextX, column } = getColumnFromSelect({
      selects,
      selectIndex: index,
      data,
      x,
    })
    x = nextX
    return column
  })

  const { height, width } = getDimensionsFromWidgets({ widgets })

  const dashObj = {
    ...base,
    widgetTemplates: _.flatten(widgets),
    name: dashboardName,
    width,
    height,
  }
  console.log(dashObj)

  const msg = uploadDashboard({ dashObj, options, baseURL })
  return msg
}
