import { useEffect, useState } from "react";
import { API } from "../../axios/url";
import CompaniesCard from "../../components/CompaniesCard";
import type { Company } from "../../interfaces/company";

export default function Companies() {
    const [companies, setCompanies] = useState<Company[]>([])

    useEffect(() => {
        console.log(companies)
    }, [companies])

    useEffect(() => {
        const getCompanies = async () => {
            try {
                const { data } = await API.get("/jobs/companies-main-page")
                setCompanies(data.companies)
            } catch (e) {
                console.error("An error has ocurred", e)
            }
        }
        getCompanies()
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-10 items-center justify-center gap-4">
                {companies.length === 0 ? (
                    <h2 className="font-bold text-red-500 text-xl">No hay empresas disponibles</h2>
                ) : (
                    companies.map((company: Company) => (
                        <CompaniesCard key={company.id} company={company} />
                    ))
                )}
            </div>
        </>
    );
}