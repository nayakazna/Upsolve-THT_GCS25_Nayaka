import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/rickroll" 
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Donasi
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Tentang
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}