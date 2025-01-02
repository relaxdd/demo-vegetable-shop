import { useMemo } from 'react'
import { useAppStore } from '../providers/AppProvider.tsx'

interface IBasketTotal {
  id: number,
  total: number
}

function useBasketSidebarData(totals: IBasketTotal[]) {
  const { config } = useAppStore()

  const subtotal = useMemo(() => {
    return totals.reduce((acc, it) => acc + it.total, 0)
  }, [totals])

  const total = useMemo(() => {
    return subtotal + config.tax + config.shipping
  }, [subtotal])

  return { subtotal, total }
}

export type { IBasketTotal }
export default useBasketSidebarData