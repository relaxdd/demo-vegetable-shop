import { FC, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import useDidUpdateEffect from './hooks/useDidUpdateEffect.ts'
import AppLayout from './layouts/AppLayout.tsx'
import App, { loadPageData, PageData } from './templates/App.tsx'

type AppWrapperProps = { pageData: PageData }

const AppWrapper: FC<AppWrapperProps> = ({ pageData }) => {
  const location = useLocation()
  const [clientPageData, setClientPageData] = useState(pageData)
  const [isLoading, setLoading] = useState(false)
  const queue = useRef<Promise<any>[]>([])

  useDidUpdateEffect(() => {
    setLoading(true)

    queue.current.push(loadPageData(location.pathname))
    Promise.all(queue.current)
           .then(async (data) => {
             setClientPageData(data.at(-1) ?? {})
           })
           .catch((err) => {
             console.error(err)
           })
           .finally(() => {
             if (queue.current.length) {
               setLoading(false)
               queue.current = []
             }
           })
  }, [location.pathname])

  if (isLoading) {
    return (
      <AppLayout>
        <p style={{ marginTop: '32px' }}>Wait while the download is in progress...</p>
      </AppLayout>
    )
  }

  return (
    <App
      side="client"
      pageData={clientPageData}
      isLoading={false}
    />
  )
}

export default AppWrapper