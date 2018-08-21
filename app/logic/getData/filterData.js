export default ({ data, wheres = [], type }) => {
  let newData = data
  wheres.forEach(({ field, operator, value }) => {
    // TODO: or the data contains that field (ex: filter bts by tier)
    if (field === type) {
      newData = newData.filter(({ name }) => {
        if (operator === 'EQUALS') {
          return name === value
        } else if (operator === 'REGEXP') {
          return new RegExp(value, 'i').test(name)
        } else {
          return true
        }
      })
    }
  })

  return newData
}
