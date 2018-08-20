import _ from 'lodash'

export default ({ applications = [], key }) => {
  const mostlyFlattenedList = applications.map(input => {
    const list = input[key].map(element => {
      const result = {}
      result.applicationName = input.name
      result.data = element
      return result
    })
    return list
  })
  return _.flatten(mostlyFlattenedList)
}

export const flattenSEs = ({ applications = [], key }) => {
  const mostlyFlattenedList = applications.map(input => {
    const list = input[key].map(element =>
      element[key].map(final => ({
        ...element,
        applicationName: input.name,
        data: final,
      })),
    )
    return list
  })
  return _.flatten(_.flatten(mostlyFlattenedList))
}
