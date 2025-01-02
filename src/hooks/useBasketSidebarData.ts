import { useMemo } from 'react'
import { useAppStore } from '../providers/AppProvider.tsx'
import { roundNumber } from '../utils'

interface IBasketTotal {
  id: number,
  total: number
}

function useBasketSidebarData(totals: IBasketTotal[]) {
  const { config } = useAppStore()

  const subtotal = useMemo(() => {
    return roundNumber(totals.reduce((acc, it) => acc + it.total, 0), 2)
  }, [totals])

  const total = useMemo(() => {
    return roundNumber(subtotal + config.tax + config.shipping, 2)
  }, [subtotal])

  return { subtotal, total }
}

export type { IBasketTotal }
export default useBasketSidebarData