// NOTE: this was just a test to see how using the metrics hierarchy API would work

import querystring from 'querystring'
import rp from 'request-promise'
import { options, baseURL } from './requestOptions'

const METRIC_PATH = 'Business Transaction Performance|Business Transactions'
const METRIC_PATH_ENCODED = querystring.stringify({
  'metric-path': METRIC_PATH,
})

export default async ({ applicationName }) =>
  rp({
    ...options,
    url: `${baseURL}/rest/applications/${applicationName}/metrics?output=json&${METRIC_PATH_ENCODED}`,
  })
    .promise()
    .then(data => {
      const parsedData = JSON.parse(data)
      const folderNames = parsedData
        .filter(({ type }) => type === 'folder')
        .map(({ name }) => name)
      return folderNames
    })
    .catch(err => {
      console.log(err)
    })

// Application first level hierarchy
// [
//     {
//     "name": "Errors",
//     "type": "folder"
//   },
//     {
//     "name": "Overall Application Performance",
//     "type": "folder"
//   },
//     {
//     "name": "Mobile",
//     "type": "folder"
//   },
//     {
//     "name": "Information Points",
//     "type": "folder"
//   },
//     {
//     "name": "Application Infrastructure Performance",
//     "type": "folder"
//   },
//     {
//     "name": "Business Transaction Performance",
//     "type": "folder"
//   },
//     {
//     "name": "End User Experience",
//     "type": "folder"
//   },
//     {
//     "name": "Backends",
//     "type": "folder"
//   },
//     {
//     "name": "Service Endpoints",
//     "type": "folder"
//   }
// ]
