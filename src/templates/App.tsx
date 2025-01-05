import { FC } from 'react'
import { matchPath, Route, Routes } from 'react-router'
import AppLayout from '../layouts/AppLayout.tsx'
import TodoByIdPage, { TodoByIdPageData } from '../pages/TodoByIdPage.tsx'
import TodosPage, { TodosPageData } from '../pages/TodosPage.tsx'
import AppProvider from '../providers/AppProvider.tsx'
import BasketPage from '../pages/BasketPage.tsx'
import CheckoutPage from '../pages/CheckoutPage.tsx'
import HomePage, { HomePageData } from '../pages/HomePage.tsx'
import Page404 from '../pages/Page404.tsx'
import ShopPage, { ShopPageData } from '../pages/ShopPage.tsx'
import dbJson from '../../db.json'
import SsrProvider from '../providers/SsrProvider.tsx'
import type { ISSRContext } from '../providers/SsrProvider.tsx'

type PageData<T extends Record<string, any> = {}> = T
type PageLoader = (() => Promise<PageData>) | undefined
type ListOfLoaders = { path: string, loader: PageLoader }[]
type AppProps = ISSRContext & { pageData: PageData }

const App: FC<AppProps> = ({ pageData, ...props }) => {
  return (
    <SsrProvider context={props}>
      <AppProvider
        initialData={{ products: dbJson.products, config: dbJson.config }}
      >
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage pageData={pageData as PageData<HomePageData>} />} />
            <Route path="shop" element={<ShopPage pageData={pageData as PageData<ShopPageData>} />} />
            <Route path="todos" element={<TodosPage pageData={pageData as PageData<TodosPageData>} />} />
            <Route path="todos/:id" element={<TodoByIdPage pageData={pageData as PageData<TodoByIdPageData>} />} />
            <Route path="basket" element={<BasketPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>

          <Route path="/*" element={<Page404 />} />
        </Routes>
      </AppProvider>
    </SsrProvider>
  )
}

const pageLoaders: ListOfLoaders = [
  { path: '/', loader: (HomePage as any)?.loadData },
  { path: '/shop', loader: (ShopPage as any)?.loadData },
  { path: '/basket', loader: (BasketPage as any)?.loadData },
  { path: '/todos', loader: (TodosPage as any)?.loadData },
  { path: '/todos/:id', loader: (TodoByIdPage as any)?.loadData },
]

async function loadPageData(path: string) {
  const findPath = pageLoaders.find((it) => {
    const result = matchPath(it.path, path)
    console.log(result)
    return result !== null
  })

  return findPath?.loader?.() || ({} as PageData)
}

export type { PageData }
export { pageLoaders, loadPageData }
export default App
