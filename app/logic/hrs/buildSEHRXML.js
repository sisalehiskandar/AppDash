import art from './art'
import errors from './errors'

export default ({ healthArgs, elements }) => {
  const results = elements.map(({ data: { applicationName, name, tier } }) => {
    const healths = {}
    if (healthArgs.includes('art')) {
      let artXML = art
      const artName = `z_Service Endpoint - Response Time - ${name}`
      artXML = artXML.replace('$NAME', artName)
      artXML = artXML.replace('$SENAME', name)
      artXML = artXML.replace('$TIERNAME', tier)
      healths.art = { name: artName, xml: artXML }
    }

    if (healthArgs.includes('error')) {
      let errorXML = errors
      const errorName = `z_Service Endpoint - Errors - ${name}`
      errorXML = errorXML.replace('$NAME', errorName)
      errorXML = errorXML.replace('$SENAME', name)
      errorXML = errorXML.replace('$TIERNAME', tier)
      healths.error = { name: errorName, xml: errorXML }
    }
    return {
      applicationName,
      name,
      tier,
      ...healths,
    }
  })
  return results
}
