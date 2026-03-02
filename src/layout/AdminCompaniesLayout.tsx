import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import type { Company } from "../interfaces/company";
import { getAdminCompanies } from "../helpers/admin/getAdminCompanies";
import ListLengthZeroComponent from "../components/jobs/ListLengthZeroComponent";
import AllCompaniesComponent from "../components/admin/AllCompaniesComponent";
import HeaderAdminLayout from "../components/admin/HeaderAdminLayout";
import { useAuth } from "../context/AuthContext";

export default function AdminCompaniesLayout() {
    const [companies, setCompanies] = useState<Company[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const limit = 20;
    const { token } = useAuth();

    const getAllCompanies = useCallback(async (limit: number, page: number, search?: string) => {
        try {
            const { companies, count } = await getAdminCompanies(page, limit, token!, search)
            setCompanies(companies)
            setTotal(count)
        } catch (error) {
            console.error("An error has occurred", error)
        } finally {
            setLoading(false)
        }
    }, [token, page, search])

    useEffect(() => {
        getAllCompanies(limit, page, debouncedSearch)
    }, [token, page, debouncedSearch])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search])

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50/30">
            <HeaderAdminLayout search={search} setSearch={setSearch} page={page} setPage={setPage} getAll={getAllCompanies} limit={limit} debouncedSearch={debouncedSearch} />

            <main className="flex-1 overflow-hidden pb-4">
                {loading ? (
                    <div className="flex h-full items-center justify-center w-full">
                        <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D5A521]"></div>
                            <h2 className="font-bold text-gray-500 text-xl">Cargando empresas...</h2>
                        </div>
                    </div>
                ) : companies && companies.length > 0 ? (
                    <div className="flex flex-col md:flex-row h-full w-full px-4 md:px-10 gap-6 mt-6 overflow-y-auto md:overflow-hidden pb-10">
                        <div className="w-full md:w-1/3 h-[45vh] md:h-full pr-2 overflow-y-auto custom-scroll border-b md:border-b-0 pb-10">
                            <ul className="ml-0">
                                <AllCompaniesComponent companies={companies} path="company" />
                            </ul>
                        </div>
                        <div className="flex-1 bg-white p-4 md:p-6 h-[55vh] md:h-full overflow-y-auto custom-scroll border-t md:border-t-0 md:border-l border-gray-200 shadow-inner rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                            <Outlet />
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center w-full">
                        <ListLengthZeroComponent message="solicitudes de empresas" />
                    </div>
                )}
            </main>
        </div>
    );
}
