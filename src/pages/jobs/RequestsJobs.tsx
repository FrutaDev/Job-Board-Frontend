import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../axios/url";

interface Job {
    id: number;
    title: string;
    company: {
        name: string;
    };
    location: string;
    modality: {
        name: string;
    };
    typeOfJob: {
        name: string;
    };
    isApproved: string
    createdAt: string
}

export default function RequestsJobs() {
    const [jobs, setJobs] = useState<Job[]>([])

    const { token } = useAuth();

    useEffect(() => {
        console.log(jobs)
    }, [jobs])

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
        <div>
            <h1 className="text-xl ml-35 font-semibold m-5">Solicitudes de altas de empleos</h1>
            <div className="flex flex-col justify-center ml-30 gap-5 overflow-y-auto custom-scroll">
                {jobs.length > 0 && jobs.map((job) => (
                    <div className={`border border-gray-200 ${job.isApproved === "approved" ? "bg-green-300/12 hover:bg-green-300/25" : job.isApproved === "rejected" ? "bg-red-300/12 hover:bg-red-300/25" : "bg-orange-300/12 hover:bg-orange-300/25"} rounded-xl w-1/3 p-5 cursor-pointer`}
                        key={job.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <h3>{job.title}</h3>
                                <span className="text-gray-500 -mt-1">{job.company.name}</span>
                                <span className="text-gray-500 -mt-2">{job.location}</span>
                                <div className="flex items-center gap-2 mt-2">
                                    <p className="text-xs text-black/60 bg-gray-500/8 rounded-lg p-2 w-fit whitespace-nowrap">{job.modality.name}</p>
                                    <p className="text-xs text-black/60 bg-gray-500/8 rounded-lg p-2 w-fit whitespace-nowrap">{job.typeOfJob.name}</p>
                                </div>
                            </div>
                            <aside className="flex flex-col justify-center items-center gap-2">
                                <p className={`${job.isApproved === "approved" ? "bg-green-300" : job.isApproved === "rejected" ? "bg-red-300" : "bg-orange-300/80"} rounded-full p-2 text-xs w-fit`}>
                                    {job.isApproved === "approved" ? "Aprobado" : job.isApproved === "rejected" ? "Rechazado" : "Pendiente"}
                                </p>
                                <p className="whitespace-nowrap text-sm text-gray-500/80">
                                    Creado: {job.createdAt.split("T")[0]}
                                </p>
                            </aside>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}