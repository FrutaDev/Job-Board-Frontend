import { useEffect } from "react";
import type { Company } from "../interfaces/company";
const APIBASE = import.meta.env.VITE_PROJECT_NODE_URL;

export default function CompanyDetailComponent({ company }: { company: Company }) {

    useEffect(() => {
        console.log(company);
    }, [company]);
    return (
        <>
            <header className="border-b pb-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                        <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <img
                                src={`${APIBASE}${company.logo}`}
                                alt={`${company.name} logo`}
                                className="w-32 h-32 object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                            <p className="text-xl text-blue-600 font-medium">RFC: {company.rfc}</p>
                        </div>
                    </div>
                    <div className={`${company.isApproved === "approved" ? "bg-green-50 text-green-700" :
                        company.isApproved === "rejected" ? "bg-red-50 text-red-700" :
                            "bg-orange-50 text-orange-700"
                        } px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide border transition-colors`}>
                        {company.isApproved === "approved" ? "Aprobado" : company.isApproved === "rejected" ? "Rechazado" : "Pendiente de aprobación"}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Información de Contacto</h3>
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">Correo Electrónico</h4>
                        <p className="text-gray-800 break-all">{company.contact_email}</p>
                    </div>
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">Teléfono</h4>
                        <p className="text-gray-800">{company.contact_phone}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Ubicación y Dirección</h3>
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">Dirección</h4>
                        <p className="text-gray-800">{company.street} #{company.street_number}, CP {company.zip_code}</p>
                        <p className="text-gray-600 text-sm">{company.city}, {company.state}, {company.country}</p>
                    </div>
                </div>
            </div>

            <section className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-[#D5A521] pl-4">Descripción de la Empresa</h3>
                <div className="bg-white p-6 rounded-xs border border-gray-100">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{company.description}</p>
                </div>
            </section>
        </>
    );
}
