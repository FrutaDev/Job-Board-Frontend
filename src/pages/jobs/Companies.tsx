import { useCallback, useEffect, useState } from "react";
import CompaniesCard from "../../components/CompaniesCard";
import type { Company } from "../../interfaces/company";
import { getCompanies } from "../../helpers/admin/companies/getCompanies";
import SearchComponent from "../../components/SearchComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { handlePageChange } from "../../helpers/pageHandler";

export default function Companies() {
    const [companies, setCompanies] = useState<Company[]>([])
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [loading, setLoading] = useState(true);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const limit = 20;

    useEffect(() => {
        getAllCompanies(limit, page, debouncedSearch);
    }, [page, debouncedSearch])

    const getAllCompanies = useCallback(async (limit: number, page: number, search?: string) => {
        try {
            const companies = await getCompanies(limit, page, search)
            setCompanies(companies.companies);
            setTotal(companies.count);
        } catch (error: any) {
            console.error(error.response.data);
        } finally {
            setLoading(false);
        }
    }, [page, search])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search])

    return (
        <>
            <div className="flex flex-wrap mt-10 items-center justify-center gap-4">
                <SearchComponent search={search} setSearch={setSearch} page={page} setPage={(newPage: number) => handlePageChange(setPage, newPage)} getAll={getAllCompanies} limit={limit} debouncedSearch={debouncedSearch} />
                {companies && companies.length === 0 ? (
                    <h2 className="font-bold text-red-500 text-xl">No hay empresas disponibles</h2>
                ) : (
                    <>
                        <CompaniesCard companies={companies} />
                        <PaginationComponent page={page} setPage={(newPage: number) => handlePageChange(setPage, newPage)} total={total} limit={limit} />
                    </>
                )}
            </div>
        </>
    );
}