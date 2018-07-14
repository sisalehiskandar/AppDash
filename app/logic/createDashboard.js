import rp from 'request-promise'
import getRequestOptions from './requestOptions'

export default ({ dashObj, config }) => {
  const { options, baseURL } = getRequestOptions(...config)
  if (dashObj === undefined || dashObj === null) {
    console.console.error('no dashboard obj')
    return
  }
  console.log(options, baseURL)

  rp({
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
    })
    .catch(err => {
      console.log(err)
    })
}

// const formData = {
//   file: {
//     value: Buffer.from(JSON.stringify(dashObj)),
//     options: {
//       filename: 'name_does_not_matter.json',
//     },
//   },
// }

// rp({
//   ...options,
//   url: `${baseURL}/CustomDashboardImportExportServlet`,
//   method: 'POST',
//   headers: {
//     'Content-type': 'multipart/form-data',
//   },
//   formData,
// })
//   .promise()
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.log(err)
//   })
