import { Outlet } from "react-router-dom";
import { API } from "../axios/url";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AllJobsComponent from "../components/jobs/AllJobsComponent";
import ListLengthZeroComponent from "../components/jobs/ListLengthZeroComponent";

export default function HomeLayout() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const { token } = useAuth();


    useEffect(() => {
        console.log(jobs)
    }, [jobs])

    useEffect(() => {
        if (!token) return;
        getAllJobs(20, false);
    }, [token])


    const getAllJobs = useCallback(async (limit: number, append: boolean) => {
        try {
            const { data } = await API.get("/jobs/all-jobs", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setJobs(data.jobs);
        } catch (error: any) {
            console.error(error.response.data);
        } finally {
            setLoading(false);
        }
    }, [token])


    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="w-11/12 md:w-1/2 min-h-12 border border-gray-500/30 rounded-xl mx-auto my-6 md:my-10 flex items-center justify-center shadow-xl focus-within:border-[#D5A521]">
                <form className="flex flex-row gap-4 w-full justify-between items-center" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Buscar por titulo de empleo..." className="flex-1 outline-none bg-transparent ml-2 mr-2 focus:border-[#D5A521] z-10" />
                    <button className="bg-[#D5A521] text-white px-4 rounded-lg font-semibold h-8 w-24 md:w-32 hover:bg-[#D5A521]/80 transition-colors duration-300 cursor-pointer z-10 mr-2">
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
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden w-full px-4 md:px-10 gap-6">
                    <div className="w-full md:w-1/3 h-1/2 md:h-full pr-2 overflow-y-auto custom-scroll">
                        <ul className="ml-0 md:ml-20">
                            <AllJobsComponent jobs={jobs} path="job" />
                        </ul>
                    </div>
                    <div className="flex-1 bg-white p-4 md:p-6 h-1/2 md:h-full overflow-y-auto custom-scroll border-t md:border-t-0 md:border-l border-gray-200">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <ListLengthZeroComponent message="empleos" />
            )}
        </div>
    );
}