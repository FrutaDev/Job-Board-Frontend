import { useCallback, useEffect, useState } from "react";
import AllJobsComponent from "../components/jobs/AllJobsComponent";
import { Outlet, useLocation } from "react-router-dom";
import type { Job } from "../interfaces/job";
import { getAdminJobs } from "../helpers/admin/getAdminJobs";
import ListLengthZeroComponent from "../components/jobs/ListLengthZeroComponent";
import HeaderAdminLayout from "../components/admin/HeaderAdminLayout";
import PaginationComponent from "../components/PaginationComponent";
import { handlePageChange } from "../helpers/pageHandler";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const location = useLocation();
    const { token } = useAuth();
    const limit = 20;

    useEffect(() => {
        if (!token) return;
        getAllJobs(limit, page, debouncedSearch);
    }, [token, page, debouncedSearch])

    const getAllJobs = useCallback(async (limit: number, page: number, search?: string) => {
        try {
            const { jobs, count } = await getAdminJobs(page, limit, token!, search)
            setJobs(jobs)
            setTotal(count)
        } catch (error) {
            console.error("An error has occurred", error)
        } finally {
            setLoading(false)
        }
    }, [token, page, search])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search])

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50/30">
            <HeaderAdminLayout search={search} setSearch={setSearch} page={page} setPage={setPage} getAll={getAllJobs} limit={limit} debouncedSearch={debouncedSearch} />
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
                            <PaginationComponent page={page} setPage={(newPage: number) => handlePageChange(setPage, newPage)} total={total} limit={limit} />
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