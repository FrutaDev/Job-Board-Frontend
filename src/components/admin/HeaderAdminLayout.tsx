import { NavLink } from "react-router-dom";

export default function HeaderAdminLayout() {
    return (
        <header className="w-full bg-white border-b border-gray-200 py-3 px-6 md:px-10 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-8">
                <h2 className="font-bold text-gray-800 text-lg hidden sm:block">Panel de Control</h2>
                <nav>
                    <ul className="flex items-center gap-6">
                        <li>
                            <NavLink to="/admin" end className={({ isActive }) => isActive ? "text-[#D5A521] font-bold border-b-2 border-[#D5A521] pb-1" : "text-gray-500 hover:text-[#D5A521] transition-colors"}>
                                Gestión Empleos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/companies" className={({ isActive }) => isActive ? "text-[#D5A521] font-bold border-b-2 border-[#D5A521] pb-1" : "text-gray-500 hover:text-[#D5A521] transition-colors"}>
                                Gestión Empresas
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="flex-1 max-w-md">
                <form className="relative flex items-center">
                    <input type="text" placeholder="Buscar..." className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-[#D5A521] outline-none rounded-lg py-1.5 pl-4 pr-10 text-sm transition-all" />
                    <button className="absolute right-2 p-1 text-gray-400 hover:text-[#D5A521] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>
        </header>
    )
}