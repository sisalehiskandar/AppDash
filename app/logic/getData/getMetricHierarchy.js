import querystring from 'querystring'
import rp from 'request-promise'

export default async ({ applicationName, metricPath, options, baseURL }) => {
  const encodedMetricPath = querystring.stringify({
    'metric-path': metricPath,
  })

  return rp({
    ...options,
    url: `${baseURL}/rest/applications/${applicationName}/metrics?output=json&${encodedMetricPath}`,
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
}
