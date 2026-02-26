import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../axios/url";
import type { Company } from "../../interfaces/company";
import { Outlet } from "react-router-dom";

const APIBASE = import.meta.env.VITE_PROJECT_NODE_URL


export default function RequestsJobs() {
    const [companies, setCompanies] = useState<Company[]>([])

    const { token } = useAuth();

    useEffect(() => {
        console.log(companies)
    }, [companies])

    useEffect(() => {
        const getAllRegistrationRequest = async () => {
            try {
                const { data } = await API.get('/jobs/get-companies-for-requests-page', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCompanies(data.companies)
            } catch (error) {
                console.error("An error has ocurred", error)
            }
        }
        getAllRegistrationRequest();
    }, [token]);

    return (
        <div>
            <h1 className="text-xl text-center md:text-left md:ml-10 lg:ml-35 font-semibold m-5">
                Solicitudes de altas de empresas
            </h1>

            <div className="flex flex-col items-center md:items-start md:ml-10 lg:ml-30 gap-5 p-5 overflow-y-auto custom-scroll">
                {companies.length > 0 && companies.map((company) => (
                    <div
                        key={company.id}
                        className={`border border-gray-200 ${company.isApproved === "approved" ? "bg-green-300/12 hover:bg-green-300/25" :
                            company.isApproved === "rejected" ? "bg-red-300/12 hover:bg-red-300/25" :
                                "bg-orange-300/12 hover:bg-orange-300/25"
                            } rounded-xl w-full md:w-3/4 lg:w-1/2 xl:w-1/3 p-5 cursor-pointer transition-colors`}
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                                <img
                                    src={`${APIBASE}${company.logo}`}
                                    alt={`${company.name} logo`}
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg bg-white p-2"
                                />
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-lg">{company.name}</h3>
                                    <span className="text-gray-500 text-sm break-all">{company.contact_email}</span>
                                    <span className="text-gray-500 text-sm">{company.contact_phone}</span>
                                </div>
                            </div>

                            <aside className="flex flex-col justify-center items-center sm:items-end gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                                <p className={`${company.isApproved === "approved" ? "bg-green-300" :
                                    company.isApproved === "rejected" ? "bg-red-300" :
                                        "bg-orange-300/80"
                                    } rounded-full px-3 py-1 text-xs font-medium w-fit`}>
                                    {company.isApproved === "approved" ? "Aprobado" : company.isApproved === "rejected" ? "Rechazado" : "Pendiente"}
                                </p>
                                <p className="whitespace-nowrap text-xs text-gray-500/80">
                                    Creado: {company.createdAt.split("T")[0]}
                                </p>
                            </aside>
                            <div>
                                <Outlet />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}