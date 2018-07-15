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
      console.log(data)
      return { msg: 'Created dashboard successfully!', type: 'success' }
    })
    .catch(err => {
      console.error(err)
      return { msg: `Error: ${err}`, type: 'danger' }
    })
}
