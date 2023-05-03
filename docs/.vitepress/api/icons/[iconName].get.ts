import { eventHandler, getQuery, setResponseHeader, createError } from 'h3'
import * as iconNodes from '../../data/iconNodes'
import { camelCase } from 'lodash-es'
import createLucideIcon from 'lucide-react/src/createLucideIcon'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'

export default eventHandler((event) => {
  const { params } = event.context

  const camelCaseName = camelCase(params.iconName)
  const iconNode = iconNodes[camelCaseName]

  if (iconNode == null) {
    const error = createError({
      statusCode: 404,
      message: `Icon "${params.iconName}" not found`,
    })

    return sendError(event, error)
  }

  const width = getQuery(event).width || undefined
  const height = getQuery(event).height || undefined
  const color = getQuery(event).color || undefined
  const strokeWidth = getQuery(event).strokeWidth || undefined

  const LucideIcon = createLucideIcon(params.iconName, iconNode)

  const svg = Buffer.from(
    renderToString(
      createElement(LucideIcon, {
        width,
        height,
        color: color ? `#${color}` : undefined,
        strokeWidth,
      }
    ))
  ).toString('utf8');

  defaultContentType(event, 'image/svg+xml')
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000')

  return svg

})
