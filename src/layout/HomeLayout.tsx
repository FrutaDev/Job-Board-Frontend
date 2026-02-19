import { NavLink, Outlet } from "react-router-dom";
import { API } from "../axios/url";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function HomeLayout() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();


    const numberFormater = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    });

    useEffect(() => {
        try {
            if (!token) return;
            const getAllJobs = async () => {
                const { data } = await API.get("/jobs/all-jobs", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setJobs(data.jobs);
            }
            getAllJobs();
        } catch (error: any) {
            console.error(error.response.data);
        } finally {
            setLoading(false);
        }
    }, [token])


    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="w-1/2 min-h-12 border border-gray-500/30 rounded-xl mx-auto my-10 flex items-center justify-center shadow-xl">
                <form className="flex flex-row gap-4 w-full justify-between items-center">
                    <input type="text" placeholder="Buscar" className="flex-1 outline-none bg-transparent ml-2 mr-2 focus:border-[#D5A521] z-10" />
                    <button className="bg-[#D5A521] text-white px-4 rounded-lg font-semibold h-8 w-32 hover:bg-[#D5A521]/80 transition-colors duration-300 cursor-pointer z-10 mr-2">
                        Buscar
                    </button>
                </form>
            </div>
            {loading && (
                <div className="flex flex-1 mt-15 justify-center overflow-hidden w-full">
                    <h2 className="font-bold text-gray-500 text-xl">Cargando...</h2>
                </div>
            )}

            {jobs.length > 0 && !loading ? (
                <div className="flex flex-1 overflow-hidden w-full px-10 gap-6">
                    <div className="w-1/3 h-full overflow-y-auto pr-2 custom-scroll">
                        <ul className="ml-20">
                            {jobs.map((job: any) => (
                                <li key={job.id}>
                                    <NavLink to={`/job/${job.id}`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${jobCardBase} ${jobCardActive}`
                                                : `${jobCardBase} ${jobCardInactive}`
                                        }>
                                        <p className="font-bold">{job.title}</p>
                                        <p className="text-gray-500 text-sm">{job.company.name}</p>
                                        <p className="text-gray-500 -mt-1 text-sm">{job.location}</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <p className={aditionalDetailsStyle}>{job.typeOfJob.name}</p>
                                            <p className={aditionalDetailsStyle}>{job.modality.name}</p>
                                            <p className={aditionalDetailsStyle}>{numberFormater.format(job.salary_min)} - {numberFormater.format(job.salary_max)} por mes</p>
                                        </div>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 bg-white p-6 h-full overflow-y-auto custom-scroll">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 mt-15 justify-center overflow-hidden w-full">
                    <h2 className="font-bold text-red-500 text-xl">No hay empleos disponibles</h2>
                </div>
            )}
        </div>
    );
}


const aditionalDetailsStyle = "text-gray-600 font-semibold bg-gray-500/10 rounded-lg w-fit p-1.5 text-xs whitespace-nowrap overflow-hidden text-ellipsis"
const jobCardBase = "mb-4 p-5 border-1 rounded-xl block w-full h-full transition-colors duration-300 cursor-pointer shadow-md";
const jobCardInactive = "border-gray-500/30 hover:bg-gray-500/10 hover:border-[#D5A521] hover:shadow-xl hover:border-1.5";
const jobCardActive = "bg-gray-500/10 border-[#D5A521] shadow-xl";