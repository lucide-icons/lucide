import { eventHandler, setResponseHeader } from 'h3'
import * as iconMetaData from '../../data/iconMetaData'
import { kebabCase } from 'lodash-es'

export default eventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400')

  return Object.fromEntries(
    Object.entries(iconMetaData).map(([name, { tags }]) => [ kebabCase(name), tags ])
  )
})
