import './Navbar.css';
import {Link} from 'react-router-dom'
const Navbar = () => {
    return ( 
            <nav className="navbar">
              <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                  Grumble Social
                </Link>
                <ul className="navbar-menu">
                  <li className="navbar-item">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/notifications">Notifications</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/">Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>
          );
}
 
export default Navbar;