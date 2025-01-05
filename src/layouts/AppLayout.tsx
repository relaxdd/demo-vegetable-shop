import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router'
import Footer from '../templates/Footer.tsx'
import Header from '../templates/Header.tsx'

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          {children ?? <Outlet />}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AppLayout