import { Outlet } from 'react-router'
import Footer from '../templates/Footer.tsx'
import Header from '../templates/Header.tsx'

const AppLayout = () => {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AppLayout