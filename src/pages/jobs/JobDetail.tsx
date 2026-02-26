import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../axios/url";
import type { Job } from "../../interfaces/job";
import JobDetailComponent from "../../components/jobs/JobDetailComponent";
import { useLocation } from "react-router-dom";
import ApplyNow from "../../components/ApplyNow";
import AcceptReject from "../../components/AcceptReject";

export default function JobDetail({ handleApply, handleAcceptReject }: { handleApply?: (jobId: string) => void, handleAcceptReject?: (jobId: string, status: string) => void }) {
    const { id } = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const location = useLocation();
    const path = location.pathname;
    const role = path.split("/")[1];

    useEffect(() => {
        const getJob = async () => {
            try {
                const { data } = await API.get(`/jobs/${id}`);
                setJob(data.job);
            } catch (error) {
                console.error("An error has occurred", error);
            }
        };
        getJob();
    }, [id]);

    if (!job) {
        return <div className="flex justify-center items-center h-screen">Cargando oferta...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto my-4 md:my-10 p-4 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <JobDetailComponent job={job} />

            {role === "job" ? (
                <ApplyNow handleApply={handleApply!} jobId={String(job.id)} />
            ) : (
                <AcceptReject handleAcceptReject={handleAcceptReject!} jobId={String(job.id)} />
            )}
        </div>
    );
}