import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../axios/url";
import type { Company } from "../../interfaces/company";
import { Outlet, useNavigate } from "react-router-dom";

const APIBASE = import.meta.env.VITE_PROJECT_NODE_URL


export default function RequestsCompanies() {
    const [companies, setCompanies] = useState<Company[]>([])

    const { token } = useAuth();

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
        <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">
                Solicitudes de altas de empresas
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 pb-20">
                {companies.length > 0 && companies.map((company) => (
                    <div
                        key={company.id}
                        className={`border border-gray-200 ${company.isApproved === "approved" ? "bg-green-300/12 hover:bg-green-300/25" :
                            company.isApproved === "rejected" ? "bg-red-300/12 hover:bg-red-300/25" :
                                "bg-orange-300/12 hover:bg-orange-300/25"
                            } rounded-2xl w-full p-6 transition-all duration-300 hover:shadow-md group cursor-pointer`}
                    >
                        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">

                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left w-full">
                                <div className="flex-shrink-0 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                                    <img
                                        src={`${APIBASE}${company.logo}`}
                                        alt={`${company.name} logo`}
                                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                                    />
                                </div>
                                <div className="flex flex-col overflow-hidden w-full">
                                    <h3 className="font-bold text-lg text-gray-900 transition-colors">{company.name}</h3>
                                    <span className="text-gray-600 text-sm truncate font-medium mt-1">{company.contact_email}</span>
                                    <span className="text-gray-500 text-sm mt-0.5">{company.contact_phone}</span>
                                </div>
                            </div>

                            <aside className="flex flex-col justify-center items-center sm:items-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                                <span className={`${company.isApproved === "approved" ? "bg-green-100 text-green-700" :
                                    company.isApproved === "rejected" ? "bg-red-100 text-red-700" :
                                        "bg-orange-100 text-orange-700"
                                    } rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider`}>
                                    {company.isApproved === "approved" ? "Aprobado" : company.isApproved === "rejected" ? "Rechazado" : "Pendiente"}
                                </span>
                                <p className="whitespace-nowrap text-[10px] sm:text-xs text-gray-400 font-medium">
                                    Solicitado: {company.createdAt.split("T")[0]}
                                </p>
                            </aside>

                        </div>
                    </div>
                ))}
            </div>
            {companies.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <p className="text-lg font-medium">No hay solicitudes pendientes</p>
                </div>
            )}
        </div>
    );
}