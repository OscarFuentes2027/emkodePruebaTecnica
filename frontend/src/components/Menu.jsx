import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <div>
      <div className="sidebar d-flex flex-column">
        <h1 className="fw-bold">Bangest</h1>

        <nav className="nav flex-column mt-3">
          <Link to="/" className="nav-link d-flex align-items-center">
            <i className="bi bi-house"></i>
            <span>Clientes activos</span>
          </Link>
          <Link to="/cuentas-ahorro" className="nav-link d-flex align-items-center">
            <i className="bi bi-person"></i>
            <span>Cuentas de ahorros</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Menu;
