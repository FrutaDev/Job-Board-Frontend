import { NavLink } from "react-router-dom";
import type { Job } from "../../interfaces/job";

export default function AllJobsComponent({ jobs, path }: { jobs: Job[], path: string }) {
    return (
        <>
            {jobs.map((job: any) => (
                <li key={job.id}>
                    <NavLink to={`${path}/${job.id}`}
                        className={({ isActive }) =>
                            isActive
                                ? `${jobCardBase} ${jobCardActive}`
                                : `${jobCardBase} ${jobCardInactive}`
                        }>
                        <p className="font-bold">{job.title}</p>
                        <p className="text-gray-500 text-sm">{job.company.name}</p>
                        <p className="text-gray-500 -mt-1 text-sm">{job.location}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <p className={aditionalDetailsStyle}>{job.typeOfJob.name}</p>
                            <p className={aditionalDetailsStyle}>{job.modality.name}</p>
                            <p className={aditionalDetailsStyle}>{numberFormater.format(job.salary_min)} - {numberFormater.format(job.salary_max)} por mes</p>
                        </div>
                    </NavLink>
                </li>
            ))}
        </>
    );
}

const numberFormater = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
});

const aditionalDetailsStyle = "text-gray-600 font-semibold bg-gray-500/10 rounded-lg w-fit p-1.5 text-xs whitespace-nowrap overflow-hidden text-ellipsis"
const jobCardBase = "mb-4 p-5 border-1 rounded-xl block w-full h-full transition-colors duration-300 cursor-pointer shadow-md";
const jobCardInactive = "border-gray-500/30 hover:bg-gray-500/10 hover:border-[#D5A521] hover:shadow-xl hover:border-1.5";
const jobCardActive = "bg-gray-500/10 border-[#D5A521] shadow-xl";