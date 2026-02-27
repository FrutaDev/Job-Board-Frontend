import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../axios/url";
import type { Company } from "../../interfaces/company";
import CompanyDetailComponent from "../../components/CompanyDetailComponent";
import AcceptReject from "../../components/AcceptReject";

export default function CompanyDetail({ handleAcceptReject }: { handleAcceptReject?: (companyId: string, status: string) => void }) {
    const { id } = useParams();
    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
        const getCompany = async () => {
            try {
                const { data } = await API.get(`/admin/companies/${id}`);
                setCompany(data.company);
            } catch (error) {
                console.error("An error has occurred", error);
            }
        };
        getCompany();
    }, [id]);

    if (!company) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D5A521]"></div>
                <p className="text-gray-500 font-medium">Cargando solicitud de empresa...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-6 md:my-10 p-4 md:p-8 bg-white border border-gray-200 rounded-3xl shadow-sm">
            <CompanyDetailComponent company={company} />

            <AcceptReject handleAcceptReject={handleAcceptReject!} jobId={String(company.id)} />
        </div>
    );
}
