import { NavLink } from "react-router-dom";
import type { Company } from "../../interfaces/company";

const APIBASE = import.meta.env.VITE_PROJECT_NODE_URL;

export default function AllCompaniesComponent({ companies, path }: { companies: Company[], path: string }) {
    return (
        <>
            {companies.map((company) => (
                <li key={company.id}>
                    <NavLink to={`${path}/${company.id}`}
                        className={({ isActive }) =>
                            isActive
                                ? `${cardBase} ${cardActive}`
                                : `${cardBase} ${cardInactive}`
                        }>
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
                                <img
                                    src={`${APIBASE}${company.logo}`}
                                    alt=""
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <p className="font-bold truncate text-gray-900">{company.name}</p>
                                <p className="text-gray-500 text-xs truncate">{company.city}, {company.state}</p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <span className={`${company.isApproved === "approved" ? "bg-green-100 text-green-700" :
                                company.isApproved === "rejected" ? "bg-red-100 text-red-700" :
                                    "bg-orange-100 text-orange-700"
                                } rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider`}>
                                {company.isApproved === "approved" ? "Aprobado" : company.isApproved === "rejected" ? "Rechazado" : "Pendiente"}
                            </span>
                            <p className="text-[9px] text-gray-400 font-medium">
                                {company.createdAt.split("T")[0]}
                            </p>
                        </div>
                    </NavLink>
                </li>
            ))}
        </>
    );
}

const cardBase = "mb-4 p-4 border rounded-xl block w-full transition-all duration-300 cursor-pointer shadow-sm";
const cardInactive = "bg-white border-gray-100 hover:border-[#D5A521] hover:shadow-md";
const cardActive = "bg-gray-50 border-[#D5A521] shadow-md ring-1 ring-[#D5A521]/20";
