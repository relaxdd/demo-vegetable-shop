import { createContext, FC, PropsWithChildren, useContext } from 'react'
import { Request } from 'express'

type ISSRContext = { isLoading: boolean } & (
  | { side: 'client', request?: undefined }
  | { side: 'server', request: Request })

interface SsrProviderProps {
  context: ISSRContext
}

const SsrContext = createContext<ISSRContext>(null!)
const useSsrContext = () => useContext(SsrContext)

const SsrProvider: FC<PropsWithChildren<SsrProviderProps>> = ({ children, context }) => {
  return (
    <SsrContext.Provider value={context}>
      {children}
    </SsrContext.Provider>
  )
}

export type { ISSRContext }
export { useSsrContext }
export default SsrProvider