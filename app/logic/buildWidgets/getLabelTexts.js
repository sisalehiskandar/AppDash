import flattenAppElements, { flattenSEs } from './flattenAppElements'

export default ({ select, data }) => {
  let labelTexts
  if (select === 'application') {
    labelTexts = data.applications.map(({ name }) => name)
  } else if (select === 'se') {
    const ses = flattenSEs({
      applications: data.applications,
      key: 'ses',
    })
    labelTexts = ses.map(({ data: name }) => name)
  } else {
    const elements = flattenAppElements({
      applications: data.applications,
      key: `${select}s`,
    })
    labelTexts = elements.map(({ data: { name } }) => name)
  }
  return { labelTexts }
}
