import { NavLink, Outlet } from "react-router-dom";

export default function RequestsLayout() {
    return (
        <div>
            <header className="w-full pt-4 pb-4 pr-6 border-b border-gray-200/50 shadow-sm bg-purple-900/50">
                <nav className="flex justify-center">
                    <ul className="flex w-fit items-center gap-4 bg-white/85 p-1.5 rounded-full shadow-xl border border-gray-200/80">
                        <li>
                            <NavLink to="/requests/jobs" className={({ isActive }) => isActive ? activeStyles : hoverStyles}>Empleos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/requests/companies" className={({ isActive }) => isActive ? activeStyles : hoverStyles}>Empresas</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}

const activeStyles = "underline p-1.5 rounded-full"
const hoverStyles = "hover:underline p-1.5 rounded-full"