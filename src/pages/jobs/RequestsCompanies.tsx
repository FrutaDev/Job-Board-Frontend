import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../axios/url";

const APIBASE = import.meta.env.VITE_PROJECT_NODE_URL

interface Company {
    id: number;
    name: string;
    contact_email: string;
    contact_phone: string;
    logo: string;
    isApproved: string;
    createdAt: string;
}

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
            <h1 className="text-xl ml-35 font-semibold m-5">Solicitudes de altas de empresas</h1>
            <div className="flex flex-col justify-center ml-30 gap-5">
                {companies.length > 0 && companies.map((company) => (
                    <div className={`border border-gray-200 ${company.isApproved === "approved" ? "bg-green-300/12 hover:bg-green-300/25" : company.isApproved === "rejected" ? "bg-red-300/12 hover:bg-red-300/25" : "bg-orange-300/12 hover:bg-orange-300/25"} rounded-xl w-1/3 p-5 cursor-pointer`}
                        key={company.id}>
                        <div className="flex items-center justify-between">
                            <img src={`${APIBASE}${company.logo}`} alt={`${company.name} logo`} className="w-45 h-45 mb-10 p-7 object-contain rounded-lg" />
                            <div className="flex flex-col">
                                <h3 className="font-semibold">{company.name}</h3>
                                <span className="text-gray-500 -mt-1">{company.contact_email}</span>
                                <span className="text-gray-500 -mt-2">{company.contact_phone}</span>
                            </div>
                            <aside className="flex flex-col justify-center items-center gap-2">
                                <p className={`${company.isApproved === "approved" ? "bg-green-300" : company.isApproved === "rejected" ? "bg-red-300" : "bg-orange-300/80"} rounded-full p-2 text-xs w-fit`}>
                                    {company.isApproved === "approved" ? "Aprobado" : company.isApproved === "rejected" ? "Rechazado" : "Pendiente"}
                                </p>
                                <p className="whitespace-nowrap text-sm text-gray-500/80">
                                    Creado: {company.createdAt.split("T")[0]}
                                </p>
                            </aside>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}