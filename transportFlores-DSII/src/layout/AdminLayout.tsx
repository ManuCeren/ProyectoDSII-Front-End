
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <aside className="sidebar bg-dark text-white p-3">
        <h4 className="text-center mb-4">🚚 Transporte Flores</h4>
        <nav className="nav flex-column">
          <Link className="nav-link text-white" to="/">Dashboard</Link>
          <Link className="nav-link text-white" to="/clientelista">Clientes</Link>
          <Link className="nav-link text-white" to="/unidadeslista">Unidades</Link>
          <Link className="nav-link text-white" to="/envioslista">Envíos</Link>
        </nav>
      </aside>

      <div className="content flex-grow-1">
        <header className="bg-light p-3 shadow-sm sticky-top">
          <h5 className="mb-0">Panel de Administración</h5>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
