import flattenAppElements from './flattenAppElements'

export default ({ select, data }) => {
  let labelTexts
  if (select === 'application') {
    labelTexts = data.applications.map(({ name }) => name)
  } else {
    const elements = flattenAppElements({
      applications: data.applications,
      key: `${select}s`,
    })
    labelTexts = elements.map(({ data: { name } }) => name)
  }
  return { labelTexts }
}
