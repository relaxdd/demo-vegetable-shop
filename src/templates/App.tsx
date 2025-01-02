import { FC } from 'react'
import { Route, Routes } from 'react-router'
import AppLayout from '../layouts/AppLayout.tsx'
import AppProvider from '../providers/AppProvider.tsx'
import BasketPage from '../pages/BasketPage.tsx'
import CheckoutPage from '../pages/CheckoutPage.tsx'
import HomePage from '../pages/HomePage.tsx'
import Page404 from '../pages/Page404.tsx'
import ShopPage from '../pages/ShopPage.tsx'
import dbJson from '../db.json'
import SsrProvider, { ISsrContext } from '../providers/SsrProvider.tsx'

const App: FC<ISsrContext> = (props) => {
  return (
    <SsrProvider context={props}>
      <AppProvider
        initialData={{ products: dbJson.products, config: dbJson.config }}
      >
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="basket" element={<BasketPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>

          <Route path="/*" element={<Page404 />} />
        </Routes>
      </AppProvider>
    </SsrProvider>
  )
}

export default App
