import { createHashHistory } from 'history'
import { match } from 'path-to-regexp'

export const history = createHashHistory()

export function normalizeLink(to, location = history.location) {
  to = to || ''

  if (to && to[0] === '#') {
    to = location.pathname + location.search + to
  } else if (to && to[0] === '?') {
    to = location.pathname + to
  }

  const idx = to.indexOf('?')
  const idx2 = to.indexOf('#')
  let pathname = ~idx ? to.substring(0, idx) : ~idx2 ? to.substring(0, idx2) : to
  let search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : ''
  let hash = ~idx2 ? to.substring(idx2) : location.hash

  if (!pathname) {
    pathname = location.pathname
  } else if (pathname[0] !== '/' && !/^https?:\/\//.test(pathname)) {
    let relativeBase = location.pathname
    const paths = relativeBase.split('/')
    paths.pop()
    let m
    while ((m = /^\.\.?\//.exec(pathname))) {
      if (m[0] === '../') {
        paths.pop()
      }
      pathname = pathname.substring(m[0].length)
    }
    pathname = paths.concat(pathname).join('/')
  }

  return pathname + search + hash
}

export function isCurrentUrl(to, ctx) {
  if (!to) {
    return false
  }
  const pathname = history.location.pathname

  const link = normalizeLink(to, {
    ...location,
    pathname,
    hash: '',
  })

  if (!~link.indexOf('http') && ~link.indexOf(':')) {
    let strict = ctx && ctx.strict
    return match(link, {
      decode: decodeURIComponent,
      strict: typeof strict !== 'undefined' ? strict : true,
    })(pathname)
  }

  return decodeURI(pathname) === link
}
