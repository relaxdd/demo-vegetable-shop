import { NavLink } from 'react-router'
import { useAppStore } from '../providers/AppProvider.tsx'

const Header = () => {
  const { basket } = useAppStore()

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <span className="header-brand font-newsreader">World Peas</span>
          </div>

          <div className="header-right">
            <nav className="header-nav">
              <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/shop">Shop</NavLink></li>
                <li><NavLink to="#">Who we are</NavLink></li>
                <li><NavLink to="#">My profile</NavLink></li>
              </ul>
            </nav>

            <NavLink
              to="/basket"
              className="primary-accent-btn"
              children={`Basket (${basket.length})`}
              data-disabled={+(basket.length === 0)}
              onClick={(e) => {
                if (basket.length === 0) {
                  e.preventDefault()
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header