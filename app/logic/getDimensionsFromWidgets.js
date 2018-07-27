import _ from 'lodash'

export default ({ widgets }) => {
  const allWidgets = _.flatten(widgets)
  const bottomCoords = allWidgets.map(({ y, height }) => y + height)
  const rightCoords = allWidgets.map(({ x, width }) => x + width)
  return { width: _.max(rightCoords), height: _.max(bottomCoords) }
}
