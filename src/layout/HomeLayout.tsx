import { Outlet } from "react-router-dom";
import { API } from "../axios/url";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AllJobsComponent from "../components/jobs/AllJobsComponent";
import ListLengthZeroComponent from "../components/jobs/ListLengthZeroComponent";
import PaginationComponent from "../components/PaginationComponent";
import SearchComponent from "../components/SearchComponent";
import { handlePageChange } from "../helpers/pageHandler";

export default function HomeLayout() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const { token } = useAuth();
    const limit = 20;


    useEffect(() => {
        console.log(jobs)
        console.log(total)
    }, [jobs, total])

    useEffect(() => {
        if (!token) return;
        getAllJobs(limit, page, debouncedSearch);
    }, [token, page, debouncedSearch])


    const getAllJobs = useCallback(async (limit: number, page: number, search?: string) => {
        try {
            const { data } = await API.get("/jobs/all-jobs", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    limit,
                    page,
                    search
                }
            });
            setJobs(data.jobs);
            setTotal(data.count);
        } catch (error: any) {
            console.error(error.response.data);
        } finally {
            setLoading(false);
        }
    }, [token, page, search])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search])

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <SearchComponent search={search} setSearch={setSearch} page={page} setPage={(newPage: number) => handlePageChange(setPage, newPage)} getAll={getAllJobs} limit={limit} debouncedSearch={debouncedSearch} />
            {loading && (
                <div className="flex flex-1 mt-15 justify-center overflow-hidden w-full">
                    <h2 className="font-bold text-gray-500 text-xl">Cargando...</h2>
                </div>
            )}

            {jobs.length > 0 && !loading ? (
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden w-full px-4 md:px-10 gap-6">
                    <div className="w-full md:w-1/3 h-1/2 md:h-full pr-2 overflow-y-auto custom-scroll">
                        <ul className="ml-0">
                            <AllJobsComponent jobs={jobs} path="job" />
                        </ul>
                        <PaginationComponent page={page} setPage={(newPage: number) => handlePageChange(setPage, newPage)} total={total} limit={limit} />
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