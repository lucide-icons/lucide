import { eventHandler, getQuery, setResponseHeader } from 'h3'
import * as iconNodes from '../../data/iconNodes'
import { kebabCase } from 'lodash-es'

export default eventHandler((event) => {
  const query = getQuery(event)

  const withUniqueKeys = query.withUniqueKeys === 'true'

  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400')

  return Object.fromEntries(
    Object.entries(iconNodes).map(([name, iconNode]) => {
      const kebabName = kebabCase(name)

      if (withUniqueKeys) {
        return [kebabName, iconNode]
      }

      return [
        kebabName,
        iconNode.map(([name, attrs]) => {
          delete attrs.key
          return [name, attrs]
        })]
    })
  )
})
