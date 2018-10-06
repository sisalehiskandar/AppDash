import rp from 'request-promise'
import _ from 'lodash'

const uploadHR = ({ applicationName, xml, options, baseURL }) => rp({
    ...options,
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
          body: Buffer.from(xml),
        },
      ],
    },
    url: `${baseURL}/healthrules/${applicationName}?overwrite=true`,
  }).promise()

export default async ({ data, options, baseURL }) => {
  console.log(baseURL)

  const uploadPromises = data.map(({ applicationName, art, error }) => {
    const uploadArgs = {
      applicationName,
      options,
      baseURL,
    }
    const artPromise = uploadHR({
      ...uploadArgs,
      xml: art.xml,
    })
    const errorPromise = uploadHR({
      ...uploadArgs,
      xml: error.xml,
    })
    return [artPromise, errorPromise]
  })
  return Promise.all(_.flatten(uploadPromises))
}
