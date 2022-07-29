import './index.css'
import 'amis/lib/themes/cxd.css'
import 'amis/lib/helper.css'
import 'amis/sdk/iconfont.css'
import appSchema from './app-schema'
import { worker } from './mocks/browser'
import { history, normalizeLink, isCurrentUrl } from './utils'
import 'amis/sdk/sdk'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  await worker.start({
    onUnhandledRequest: 'bypass',
  })
}

const amis = window.amis || {}

const { embed } = amis.require('amis/embed')

const amisInstance = embed(
  '#root',
  appSchema,
  {
    location: history.location,
    locale: 'zh-CN',
  },
  {
    watchRouteChange: fn => {
      return history.listen(fn)
    },
    updateLocation: (location, replace) => {
      location = normalizeLink(location)
      if (location === 'goBack') {
        return history.back()
      } else if (
        (!/^https?:\/\//.test(location) && location === history.location.pathname + history.location.search) ||
        location === history.location.href
      ) {
        // 目标地址和当前地址一样，不处理，免得重复刷新
        return
      } else if (/^https?:\/\//.test(location) || !history) {
        return (window.location.href = location)
      }

      history[replace ? 'replace' : 'push'](location)
    },
    jumpTo: (to, action) => {
      if (to === 'goBack') {
        return history.back()
      }

      to = normalizeLink(to)

      if (isCurrentUrl(to)) {
        return
      }

      if (action && action.actionType === 'url') {
        action.blank === false ? (window.location.href = to) : window.open(to, '_blank')
        return
      } else if (action && action.blank) {
        window.open(to, '_blank')
        return
      }

      if (/^https?:\/\//.test(to)) {
        window.location.href = to
      } else if (
        (!/^https?:\/\//.test(to) && to === history.pathname + history.location.search) ||
        to === history.location.href
      ) {
        // do nothing
      } else {
        history.push(to)
      }
    },
    isCurrentUrl: isCurrentUrl,
    theme: 'cxd',
  },
)

history.listen(state => {
  amisInstance.updateProps({
    location: state.location || state,
  })
})
