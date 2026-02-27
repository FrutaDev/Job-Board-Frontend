import { useEffect, useState } from "react";
import AllJobsComponent from "../components/jobs/AllJobsComponent";
import { NavLink, Outlet } from "react-router-dom";
import type { Job } from "../interfaces/job";
import { getAdminJobs } from "../helpers/admin/getAdminJobs";
import ListLengthZeroComponent from "../components/jobs/ListLengthZeroComponent";

export default function AdminLayout() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        console.log(jobs)
    }, [jobs])

    useEffect(() => {
        const getAdminJobsData = async () => {
            try {
                const jobs = await getAdminJobs()
                setJobs(jobs)
            } catch (error) {
                console.error("An error has occurred", error)
            } finally {
                setLoading(false)
            }
        }
        getAdminJobsData()
    }, []);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50/30">
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
                                <NavLink to="/admin/companies" className={({ isActive }) => "text-gray-500 hover:text-[#D5A521] transition-colors"}>
                                    Gestión Empresas
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex-1 max-w-md">
                    <form className="relative flex items-center">
                        <input type="text" placeholder="Buscar empleos..." className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-[#D5A521] outline-none rounded-lg py-1.5 pl-4 pr-10 text-sm transition-all" />
                        <button className="absolute right-2 p-1 text-gray-400 hover:text-[#D5A521] cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </header>
            <main className="flex-1 overflow-hidden">
                {loading ? (
                    <div className="flex h-full items-center justify-center w-full">
                        <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D5A521]"></div>
                            <h2 className="font-bold text-gray-500 text-xl">Cargando empleos...</h2>
                        </div>
                    </div>
                ) : jobs && jobs.length > 0 ? (
                    <div className="flex h-full flex-col md:flex-row w-full px-4 md:px-10 gap-6 mt-6">
                        <div className="w-full md:w-1/3 h-1/2 md:h-full pr-2 overflow-y-auto custom-scroll">
                            <ul className="ml-0 md:ml-20">
                                <AllJobsComponent jobs={jobs} path="job" />
                            </ul>
                        </div>
                        <div className="flex-1 bg-white p-4 md:p-6 h-1/2 md:h-full overflow-y-auto custom-scroll border-t md:border-t-0 md:border-l border-gray-200 shadow-inner rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                            <Outlet />
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center w-full">
                        <ListLengthZeroComponent message="empleos" />
                    </div>
                )}
            </main>
        </div>
    );
}