import rp from 'request-promise'

export default ({ dashObj, options, baseURL }) => {
  if (dashObj === undefined || dashObj === null) {
    console.error('no dashboard obj')
    return { msg: `Error: no dashboard obj`, type: 'danger' }
  }

  return rp({
    ...options,
    url: `${baseURL}/CustomDashboardImportExportServlet`,
    method: 'POST',
    headers: {
      'Content-type': 'multipart/form-data',
    },
    multipart: {
      chunked: false,
      data: [
        {
          'Content-Disposition':
            'form-data; name="file"; filename="stuff.json"',
          body: Buffer.from(JSON.stringify(dashObj)),
        },
      ],
    },
  })
    .promise()
    .then(data => {
      const parsedData = JSON.parse(data)
      console.log(parsedData)
      const {
        success,
        errors,
        dashboard: { id },
      } = parsedData

      if (success) {
        return {
          msg: 'Created dashboard successfully!',
          type: 'success',
          dashboardLink: `${baseURL}/#/location=CDASHBOARD_DETAIL&mode=MODE_DASHBOARD&dashboard=${id}`,
        }
      } else if (errors) {
        return { msg: errors, type: 'danger' }
      } else {
        return { msg: data.toString(), type: 'danger' }
      }
    })
    .catch(err => {
      console.error(err)
      return { msg: `Error: ${err}`, type: 'danger' }
    })
}
