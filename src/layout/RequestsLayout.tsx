import { Outlet, useLocation } from "react-router-dom";
import HeaderRequestComponent from "../components/jobs/HeaderRequestComponent";
import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import type { Job } from "../interfaces/job";
import { handlePageChange } from "../helpers/pageHandler";
import { getAllCompaniesHelper, getAllJobsHelper, getAllJobsRealizedHelper, getAllJobsReceivedHelper } from "../helpers/jobs/request/getAllJobs";
import type { Company } from "../interfaces/company";
import PaginationComponent from "../components/PaginationComponent";

export default function RequestsLayout() {
    const { token } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([])
    const [companies, setCompanies] = useState<Company[]>([])
    const [postulates, setPostulates] = useState<any>([])
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(true);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const location = useLocation();
    const limit = 20;

    useEffect(() => {
        console.log(postulates)
    }, [postulates])

    useEffect(() => {
        getAll(limit, page, debouncedSearch);
    }, [token, page, debouncedSearch, location])

    const getAll = useCallback(async (limit: number, page: number, search?: string) => {
        try {
            if (location.pathname.split("/")[1] === "requests" && location.pathname.split("/")[2] === "jobs") {
                const data = await getAllJobsHelper(limit, page, token!, search);
                setJobs(data.jobs);
                setTotal(data.count || 1);
            } else if (location.pathname.split("/")[1] === "requests" && location.pathname.split("/")[2] === "companies") {
                const data = await getAllCompaniesHelper(limit, page, token!, search);
                setCompanies(data.companies);
                setTotal(data.count || 1);
            } else if (location.pathname.split("/")[1] === "postulates" && location.pathname.split("/")[2] === "jobs") {
                const data = await getAllJobsRealizedHelper(limit, page, token!, search);
                setPostulates(data.postulatedWorks);
                setTotal(data.count || 1);
            } else if (location.pathname.split("/")[1] === "postulates" && location.pathname.split("/")[2] === "companies") {
                const data = await getAllJobsReceivedHelper(limit, page, token!, search);
                setPostulates(data.postulatedWorks);
                setTotal(data.count || 1);
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [token, page, search, location])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search])

    return (
        <div className="flex flex-col h-[calc(100vh)] overflow-hidden bg-gray-50/30">
            <HeaderRequestComponent title="Solicitudes" search={search} setSearch={setSearch} page={page} setPage={(newPage: number) => handlePageChange(setPage, newPage)} getAll={getAll} limit={limit} debouncedSearch={debouncedSearch} />
            <main className="flex-1 overflow-y-auto custom-scroll pb-10">
                <Outlet context={{ jobs, companies, postulates }} />
            </main>
            <PaginationComponent page={page} setPage={(newPage: number) => handlePageChange(setPage, newPage)} total={total} limit={limit} />
        </div>
    );
}