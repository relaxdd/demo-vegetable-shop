import { Link } from 'react-router'
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/todos">My todos</Link></li>
                <li><Link to="#">My profile</Link></li>
              </ul>
            </nav>

            <Link
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