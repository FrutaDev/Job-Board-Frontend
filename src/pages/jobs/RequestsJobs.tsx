import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../axios/url";
import type { Job } from "../../interfaces/job";

export default function RequestsJobs() {
    const [jobs, setJobs] = useState<Job[]>([])

    const { token } = useAuth();

    useEffect(() => {
        const getAllRegistrationRequest = async () => {
            try {
                const { data } = await API.get('/jobs/get-jobs-for-requests-page', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setJobs(data.jobs)
            } catch (error) {
                console.error("An error has ocurred", error)
            }
        }
        getAllRegistrationRequest();
    }, [token]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">
                Solicitudes de altas de empleos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {jobs.length > 0 && jobs.map((job) => (
                    <div
                        key={job.id}
                        className={`border border-gray-200 hover:border-[#D5A521] hover:bg-gray-100/50 rounded-2xl w-full p-6 cursor-pointer transition-all duration-300 hover:shadow-md group`}
                    >
                        <div className="flex flex-col h-full justify-between gap-6">
                            <div className="flex flex-col">
                                <h3 className="font-bold text-lg text-gray-900 transition-colors">{job.title}</h3>
                                <span className="text-gray-600 font-medium truncate mt-0.5">{job.company.name}</span>
                                <span className="text-gray-400 text-sm mt-0.5 truncate">{job.location}</span>
                                <div className="flex flex-wrap items-center gap-2 mt-4">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 rounded-lg px-2.5 py-1 w-fit">{job.modality.name}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 rounded-lg px-2.5 py-1 w-fit">{job.typeOfJob.name}</p>
                                </div>
                            </div>
                            <aside className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className={`${job.isApproved === "approved" ? "bg-green-100 text-green-700" : job.isApproved === "rejected" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"} rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider`}>
                                    {job.isApproved === "approved" ? "Aprobado" : job.isApproved === "rejected" ? "Rechazado" : "Pendiente"}
                                </span>
                                <p className="text-[10px] text-gray-400 font-medium">
                                    {job.createdAt.split("T")[0]}
                                </p>
                            </aside>
                        </div>
                    </div>
                ))}
            </div>
            {jobs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <p className="text-lg font-medium">No hay solicitudes pendientes</p>
                </div>
            )}
        </div>
    );
}