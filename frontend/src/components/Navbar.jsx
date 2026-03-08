import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Coffee, ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const navClass = `navbar ${scrolled || !isHome ? 'navbar-solid' : 'navbar-transparent'}`;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={navClass}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Coffee size={22} strokeWidth={1.5} />
          <span>BrewMaster</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link></li>
          <li>
            <Link to="/cart" className="nav-cart-link" onClick={() => setMenuOpen(false)}>
              <ShoppingBag size={18} />
              <span>Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          {isAuthenticated && (
            <li><Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link></li>
          )}

          {isAuthenticated ? (
            <>
              <li className="user-info">
                <User size={14} />
                <span>{user?.username}</span>
              </li>
              <li>
                <button onClick={logout} className="btn-logout">
                  <LogOut size={14} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary btn-nav" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
