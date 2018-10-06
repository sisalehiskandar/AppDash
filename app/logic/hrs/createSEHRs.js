import buildSEHRXML from './buildSEHRXML'
import uploadHRs from './uploadHRs'

export default async ({ healthArgs, elements, options, baseURL }) => {
  const data = buildSEHRXML({ healthArgs, elements })
  const results = await uploadHRs({ data, options, baseURL })
  return results
}
