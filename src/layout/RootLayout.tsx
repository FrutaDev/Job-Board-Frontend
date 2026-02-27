import { Outlet, useNavigate } from "react-router";
import { NavLink, useLocation } from "react-router";
import UachLogoSvgComponent from "../components/UachLogoSvgComponent";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../interfaces/decodedToken";
import { handleCreateJob, handleCreateEnterprise, handlePostulate, handleRequests, handleLogout } from "../helpers/layout/rootLayoutHandle"
import { MdWork } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { AiFillCheckSquare } from "react-icons/ai";
import Footer from "../components/Footer";

export default function RootLayout() {
    const [open, setOpen] = useState(false)
    const [role, setRole] = useState<string>("");
    const location = useLocation()



    const { logout, token } = useAuth()

    useEffect(() => {
        console.log(role)
    }, [role])

    useEffect(() => {
        setOpen(false)
    }, [location])

    useEffect(() => {
        if (token) {
            const decodedToken: DecodedToken = jwtDecode(token)
            setRole(decodedToken.role)
        }
    }, [token])

    const navigate = useNavigate();



    return (
        <>
            <header className="w-full h-16 bg-white m-0 p-0 flex flex-row items-center justify-between border-b border-gray-500/30 shadow-md">
                <NavLink to="/" className="ml-4 md:ml-15">
                    <UachLogoSvgComponent width="223" height="40" />
                </NavLink>
                <nav className="mr-4 md:mr-15">
                    <ul className="flex items-center justify-center gap-4">
                        {role === "admin" && (
                            <li>
                                <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-[#D5A521] underline underline-offset-3' : 'hover:text-[#D5A521] hover:underline hover:underline-offset-3'}>Admin</NavLink>
                            </li>
                        )}
                        <li className="hidden sm:block">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'text-[#D5A521] underline underline-offset-3' : 'hover:text-[#D5A521] hover:underline hover:underline-offset-3'}>Inicio</NavLink>
                        </li>
                        <li className="hidden sm:block">
                            <NavLink to="/companies" className={({ isActive }) => isActive ? 'text-[#D5A521] underline underline-offset-3' : 'hover:text-[#D5A521] hover:underline hover:underline-offset-3'}>Empresas</NavLink>
                        </li>
                        <li className="hidden sm:block">
                            <NavLink to="/postulates/jobs" className={({ isActive }) => isActive ? 'text-[#D5A521] underline underline-offset-3' : 'hover:text-[#D5A521] hover:underline hover:underline-offset-3'}>Postulaciones</NavLink>
                        </li>
                        <li>
                            <button onClick={() => setOpen(!open)} className={`mt-2 hover:text-[#D5A521] hover:underline hover:underline-offset-3 cursor-pointer transition-transform duration-300 ${open ? 'rotate-180 text-[#D5A521]' : ''}`}><IoIosArrowDown /></button>
                            {open && (
                                <div className="absolute top-16 right-5 z-50 border border-gray-500/30 rounded-lg p-2 shadow-md bg-white w-auto h-auto">
                                    <ul className="flex flex-col items-center justify-center gap-3">
                                        <li className="sm:hidden w-full">
                                            <NavLink to="/" className="block w-full text-center p-2 hover:bg-gray-500/7 hover:rounded-lg flex items-center justify-between">
                                                <IoHome className="text-xl" /> Inicio
                                                <FaAngleRight className="text-xl opacity-10" />
                                            </NavLink>
                                        </li>
                                        <li className="sm:hidden w-full">
                                            <NavLink to="/companies" className="block w-full text-center p-2 hover:bg-gray-500/7 hover:rounded-lg flex items-center justify-between">
                                                <FaBuilding className="text-xl" /> Empresas
                                                <FaAngleRight className="text-xl opacity-10" />
                                            </NavLink>
                                        </li>
                                        <li className="sm:hidden w-full">
                                            <button onClick={() => handlePostulate(navigate, setOpen)} className={burgerMenuLiDefaultStyles}>
                                                <AiFillCheckSquare className="text-xl" /> Postulaciones
                                                <FaAngleRight className="text-xl opacity-10" /></button>
                                        </li>
                                        <li className="w-full">
                                            <button onClick={() => handleRequests(navigate, setOpen)} className={burgerMenuLiDefaultStyles}>
                                                <FaCodePullRequest className="text-xl" /> Solicitudes de altas
                                                <FaAngleRight className="text-xl opacity-10" /></button>
                                        </li>
                                        <li className="w-full">
                                            <button onClick={() => handleCreateJob(navigate, setOpen)}
                                                className={burgerMenuLiDefaultStyles}>
                                                <MdWork className="text-xl" /> Crear empleo
                                                <FaAngleRight className="text-xl opacity-10" /></button>
                                        </li>
                                        <li className="w-full">
                                            <button onClick={() => handleCreateEnterprise(navigate, setOpen)} className={burgerMenuLiDefaultStyles}>
                                                <FaBuilding className="text-xl" /> Alta de empresa
                                                <FaAngleRight className="text-xl opacity-10" />
                                            </button>
                                        </li>
                                        <li className="w-full">
                                            <button onClick={() => handleLogout(setOpen, logout)} className="w-full p-2 hover:bg-red-500/7 hover:rounded-lg cursor-pointer flex items-center justify-between hover:text-red-500">
                                                <IoLogOut className="text-2xl" /> Cerrar sesión
                                                <FaAngleRight className="text-xl opacity-10" /></button>
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
            <Footer />
        </>
    );
}


const burgerMenuLiDefaultStyles = "w-full p-2 gap-8 hover:bg-gray-500/7 hover:rounded-lg cursor-pointer flex items-center justify-between"