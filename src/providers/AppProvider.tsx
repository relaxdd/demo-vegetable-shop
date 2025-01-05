import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { LS_BASKET_KEY } from '../defines.ts'
import { IBasketItem, listOfBasket } from '../schemes/basket.schema.ts'
import { IProductItem } from '../schemes/product.schema.ts'

interface IAppStore {
  products: IProductItem[],
  basket: IBasketItem[],
  config: {
    tax: number,
    shipping: number
  }
}

type AppPayload =
  | { action: 'cart/add', payload: IBasketItem }
  | { action: 'cart/replace', payload: IBasketItem[] }
  | { action: 'cart/change', payload: { id: number, qty: number } }
  | { action: 'cart/remove', payload: number }

type AppDispatch = (data: AppPayload) => void

interface IAppContext {
  store: IAppStore,
  dispatch: AppDispatch
}

interface AppProviderProps {
  initialData?: Partial<IAppStore> | undefined
}

// ************************************ //

const defaultStore: IAppStore = {
  products: [],
  basket: [],
  config: {
    tax: 0,
    shipping: 0,
  },
}

const defaultContext: IAppContext = {
  store: defaultStore,
  dispatch: null!,
}

// ************************************ //

function extractLocalCart() {
  if (typeof window === 'undefined') return []
  const json = window.localStorage.getItem(LS_BASKET_KEY) ?? '[]'

  try {
    const unknown = JSON.parse(json) as unknown
    return listOfBasket.parse(unknown)
  } catch (e) {
    console.warn((e as Error)?.message || 'Undefined error message')
    window.localStorage.removeItem(LS_BASKET_KEY)
    return []
  }
}

// ************************************ //

const AppContext = createContext<IAppContext>(defaultContext)
const useAppContext = () => useContext(AppContext)
const useAppStore = () => useAppContext().store
const useAppDispatch = () => useAppContext().dispatch

// ************************************ //

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({ children, initialData }) => {
  const [store, setStore] = useState<IAppStore>({
    ...defaultStore,
    ...initialData,
  })

  const dispatch: AppDispatch = ({ action, payload }) => {
    switch (action) {
      case 'cart/replace':
        setStore((prev) => ({ ...prev, basket: payload }))
        break
      case 'cart/add':
        setStore((prev) => ({ ...prev, basket: [...prev.basket, payload] }))
        break
      case 'cart/remove':
        setStore((prev) => ({ ...prev, basket: prev.basket.filter(it => it.productId !== payload) }))
        break
      case 'cart/change':
        setStore((prev) => ({
          ...prev,
          basket: prev.basket.map((it) => {
            return it.productId !== payload.id
              ? it
              : { ...it, quantity: payload.qty }
          }),
        }))
        break
    }
  }

  useEffect(() => {
    dispatch({
      action: 'cart/replace',
      payload: extractLocalCart(),
    })
  }, [])

  useEffect(() => {
    window.localStorage.setItem(LS_BASKET_KEY, JSON.stringify(store.basket))
  }, [store.basket])

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { useAppContext, useAppStore, useAppDispatch }
export default AppProvider