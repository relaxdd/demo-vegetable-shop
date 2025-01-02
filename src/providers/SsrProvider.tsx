import { createContext, FC, PropsWithChildren, useContext } from 'react'
import { Request } from 'express'

type ISsrContext =
  | { side: 'client', request?: undefined }
  | { side: 'server', request: Request }

interface SsrProviderProps {
  context: ISsrContext
}

const SsrContext = createContext<ISsrContext>(null!)
const useSsrContext = () => useContext(SsrContext)

const SsrProvider: FC<PropsWithChildren<SsrProviderProps>> = ({ children, context }) => {
  return (
    <SsrContext.Provider value={context}>
      {children}
    </SsrContext.Provider>
  )
}

export type { ISsrContext }
export { useSsrContext }
export default SsrProvider