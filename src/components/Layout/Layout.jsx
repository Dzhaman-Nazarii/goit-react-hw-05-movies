import { NavLink, Outlet } from "react-router-dom";
import css from './Layout.module.css'

function Layout() {
  return (
    <>
      <header className={css.header}>
        <nav className={css.header__nav}>
          <NavLink className={({ isActive }) => `${css['header__link']}  ${isActive ? css['active'] : ''}`}  to="/">Home</NavLink>
          <NavLink className={({ isActive }) => `${css['header__link']}  ${isActive ? css['active'] : ''}`}  to="/movies">Movies</NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;