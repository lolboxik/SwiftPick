import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(hideTimer.current);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">SwiftPick</span>
        </div>

        <nav className="nav">
          <button className="nav-link" onClick={() => navigate('/catalog')}>Каталог</button>
          <button className="nav-link" onClick={() => navigate('/about')}>О нас</button>
          {isAdmin && (
            <button className="nav-link admin-link" onClick={() => navigate('/admin')}>Админ-панель</button>
          )}
        </nav>

        <div className="header-actions">
          <button className="cart-btn" onClick={() => navigate('/cart')}>
            Корзина
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>

          {user ? (
            <div
              className={`user-menu${dropdownOpen ? ' open' : ''}`}
              onMouseEnter={() => { clearTimeout(hideTimer.current); setDropdownOpen(true); }}
              onMouseLeave={() => { hideTimer.current = setTimeout(() => setDropdownOpen(false), 500); }}
            >
              <span className="user-name">
                {user.firstName || user.email}
              </span>
              <div className="user-dropdown">
                <button className="dropdown-item" onClick={() => navigate('/profile')}>Профиль</button>
                <button className="dropdown-item" onClick={() => navigate('/orders')}>Заказы</button>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn btn-outline" onClick={() => navigate('/login')}>Вход</button>
              <button className="btn btn-primary" onClick={() => navigate('/register')}>Регистрация</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
