import { useEffect, useState } from "react";
import AllJobsComponent from "../components/jobs/AllJobsComponent";
import { Outlet } from "react-router-dom";
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
                    <div className="w-1/3 h-full pr-2 overflow-y-auto custom-scroll">
                        <ul className="ml-20">
                            <AllJobsComponent jobs={jobs} path="job" />
                        </ul>
                    </div>
                    <div className="flex-1 bg-white p-6 h-full overflow-y-auto custom-scroll">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <ListLengthZeroComponent message="empleos" />
            )}
        </div>
    );
}