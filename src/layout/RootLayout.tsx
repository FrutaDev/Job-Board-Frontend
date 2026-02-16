import { Outlet } from "react-router";
import { NavLink } from "react-router";
import UachLogoSvgComponent from "../components/UachLogoSvgComponent";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IoIosArrowDown } from "react-icons/io";


export default function RootLayout() {
    const [open, setOpen] = useState(false)

    const listItemsStyle = "text-gray-300 hover:text-white hover:underline cursor-pointer transition-colors duration-300 mb-6"
    const spanItemsStyle = "text-[#747775] text-xs"

    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        setOpen(false)
    }

    return (
        <>
            <header className="w-full h-16 bg-white m-0 p-0 flex flex-row items-center justify-between border-b-1 border-gray-500/30 shadow-md">
                <div className="ml-15">
                    <UachLogoSvgComponent width="223" height="40" />
                </div>
                <nav className="mr-15">
                    <ul className="flex items-center justify-center gap-4">
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? 'text-[#D5A521] underline underline-offset-3' : 'hover:text-[#D5A521] hover:underline hover:underline-offset-3'}>Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/enterprises" className={({ isActive }) => isActive ? 'text-[#D5A521] underline underline-offset-3' : 'hover:text-[#D5A521] hover:underline hover:underline-offset-3'}>Empresas</NavLink>
                        </li>
                        <li>
                            <NavLink to="/job-positions" className={({ isActive }) => isActive ? 'text-[#D5A521] underline underline-offset-3' : 'hover:text-[#D5A521] hover:underline hover:underline-offset-3'}>Puestos y Sueldos</NavLink>
                        </li>
                        <li>
                            <button onClick={() => setOpen(!open)} className={`mt-2 hover:text-[#D5A521] hover:underline hover:underline-offset-3 cursor-pointer transition-transform duration-300 ${open ? 'rotate-180 text-[#D5A521]' : ''}`}><IoIosArrowDown /></button>
                            {open && (
                                <div className="absolute top-16 right-5 z-10 border border-gray-500/30 rounded-lg p-2 shadow-md bg-white w-60 h-auto">
                                    <ul className="flex items-center justify-center gap-4">
                                        <li>
                                            <button onClick={handleLogout} className="hover:text-[#D5A521] hover:underline hover:underline-offset-3 cursor-pointer">Cerrar Sesión</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="min-h-screen">
                <Outlet />
            </main>
            <footer className="w-full h-auto bg-[#3A2546] m-0 p-0">
                <div className="flex items-center justify-between p-15">
                    <section className="w-1/3">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <img src="/src/assets/uachFooter.png"
                                alt="uachLogo"
                                className="w-60 h-35 cursor-pointer" />
                            <div className="flex flex-col">
                                <p className="text-white">Universidad Autonoma de Chihuahua</p>
                                <span className={spanItemsStyle}>C. Escorza 900, Col. Centro 31000</span>
                                <span className={spanItemsStyle}>Tel. +52 (614) 439 1500</span>
                                <span className={spanItemsStyle}>Chihuahua, Chih. México</span>
                            </div>
                        </div>
                    </section>
                    <section className="w-1/3 mr-20">
                        <div className="border-b-1 border-gray-500/30 mb-4">
                            <p className="font-bold text-gray-300 mb-2">Ligas de interes</p>
                        </div>
                        <div className="flex items-center justify-around gap-8">
                            <div>
                                <ul>
                                    <li className={listItemsStyle}>
                                        <a href="#">Transparencia</a>
                                    </li>
                                    <li className={listItemsStyle}>
                                        <a href="#">Sala de presa</a>
                                    </li>
                                    <li className={listItemsStyle}>
                                        <a href="#">Eventos</a>
                                    </li>
                                    <li className={listItemsStyle}>
                                        <a href="#">Movilidad estudiantil</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li className={listItemsStyle}>
                                        <a href="#">Bibliotecas universitarias</a>
                                    </li>
                                    <li className={listItemsStyle}>
                                        <a href="#">Redes sociales</a>
                                    </li>
                                    <li className={listItemsStyle}>
                                        <a href="#">Contraloría social</a>
                                    </li>
                                    <li className={listItemsStyle}>
                                        <a href="#">Radio universidad</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="flex items-center justify-end mt-8 mr-4 p-3">
                    <p className="text-center text-gray-300">2026 © Todos los derechos reservados | <a href="#" className="text-[#D5A521] hover:underline">Privacidad y Políticas</a></p>
                </div>
            </footer>
        </>
    );
}