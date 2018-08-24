import _ from 'lodash'
import getConnectionDetails from './getConnectionDetails'
import { getApps } from './getData/getAppModel'

export default async ({ config }) => {
  const { options, baseURL } = getConnectionDetails({ config })
  const result = await getApps({ options, baseURL })

  return { succeeded: _.isArray(result) }
}
