import { eventHandler, setResponseHeader } from 'h3'
import iconMetaData from '../../data/iconMetaData'

export default eventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400')

  return Object.fromEntries(
    Object.entries(iconMetaData).map(([name, { tags }]) => [ name, tags ])
  )
})
