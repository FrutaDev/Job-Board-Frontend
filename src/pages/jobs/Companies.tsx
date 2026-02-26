import { useEffect, useState } from "react";
import CompaniesCard from "../../components/CompaniesCard";
import type { Company } from "../../interfaces/company";
import { getCompanies } from "../../helpers/admin/companies/getCompanies";

export default function Companies() {
    const [companies, setCompanies] = useState<Company[]>([])

    useEffect(() => {
        const getCompaniesData = async () => {
            try {
                const companies = await getCompanies()
                setCompanies(companies)
            } catch (e) {
                console.error("An error has ocurred", e)
            }
        }
        getCompaniesData()
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-10 items-center justify-center gap-4">
                {companies && companies.length === 0 ? (
                    <h2 className="font-bold text-red-500 text-xl">No hay empresas disponibles</h2>
                ) : (
                    <>
                        <CompaniesCard companies={companies} />
                    </>
                )}
            </div>
        </>
    );
}