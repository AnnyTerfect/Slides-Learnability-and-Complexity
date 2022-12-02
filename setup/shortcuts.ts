import type { NavOperations, ShortcutOptions } from '@slidev/types'
import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((nav: NavOperations, base: ShortcutOptions[]) => {
  return [
    ...base,
    {
      key: 'alt+enter',
      fn: () => {
        console.log(nav)
      },
      autoRepeat: true,
    },
    {
      key: 'arrowdown',
      fn: () => nav.next(),
      autoRepeat: true,
    },
    {
      key: 'arrowup',
      fn: () => nav.prev(),
      autoRepeat: true,
    },
  ]
})