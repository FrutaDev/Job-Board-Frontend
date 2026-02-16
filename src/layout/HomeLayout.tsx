import { NavLink, Outlet } from "react-router-dom";

const jobList = [
    {
        id: 1,
        title: "Empleo 1",
        description: "Descripción del empleo 1",
        salary: "Salario del empleo 1",
        location: "Ubicación del empleo 1",
        company: "Empresa 1",
        type: "Servicio Social",
        status: "Activo",
        benefits: {
            salary: 10000,
            hours: 4,
            schedule: "Lunes a Viernes",
            startDate: "2022-01-01",
            endDate: "2022-12-31",
        }
    },
    {
        id: 2,
        title: "Empleo 2",
        description: "Descripción del empleo 2",
        salary: "Salario del empleo 2",
        location: "Ubicación del empleo 2",
        company: "Empresa 2",
        type: "Prácticas",
        status: "Estado del empleo 2",
        benefits: {
            salary: 10000,
            hours: 4,
            schedule: "Lunes a Viernes",
            startDate: "2022-01-01",
            endDate: "2022-12-31",
        }
    },
    {
        id: 3,
        title: "Empleo 3",
        description: "Descripción del empleo 3",
        salary: "Salario del empleo 3",
        location: "Ubicación del empleo 3",
        company: "Empresa 3",
        type: "Tempo completo",
        status: "Estado del empleo 3",
        benefits: {
            salary: 15000,
            hours: 8,
            schedule: "Lunes a Viernes",
            startDate: "2022-01-01",
            endDate: "Indeterminado",
        }
    },
    {
        id: 4,
        title: "Empleo 4",
        description: "Descripción del empleo 4",
        salary: "Salario del empleo 4",
        location: "Ubicación del empleo 4",
        company: "Empresa 4",
        type: "Tempo completo",
        status: "Estado del empleo 3",
        benefits: {
            salary: 15000,
            hours: 8,
            schedule: "Lunes a Viernes",
            startDate: "2022-01-01",
            endDate: "Indeterminado",
        }
    },
]

export default function HomeLayout() {


    const numberFormater = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    });


    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="w-1/2 min-h-12 border border-gray-500/30 rounded-xl mx-auto my-10 flex items-center justify-center shadow-xl">
                <form className="flex flex-row gap-4 w-full justify-between items-center">
                    <input type="text" placeholder="Buscar" className="flex-1 outline-none bg-transparent ml-2 mr-2 focus:border-[#D5A521] z-10" />
                    <button className="bg-[#D5A521] text-white px-4 rounded-lg font-semibold h-8 w-32 hover:bg-[#D5A521]/80 transition-colors duration-300 cursor-pointer z-10 mr-2">
                        Buscar
                    </button>
                </form>
            </div>

            <div className="flex flex-1 overflow-hidden w-full px-10 gap-6">
                <div className="w-1/3 h-full overflow-y-auto pr-2 custom-scroll">
                    <ul className="ml-20">
                        {jobList.map((job) => (
                            <li key={job.id}>
                                <NavLink to={`/job/${job.id}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${jobCardBase} ${jobCardActive}`
                                            : `${jobCardBase} ${jobCardInactive}`
                                    }>
                                    <p className="font-bold">{job.title}</p>
                                    <p className="text-gray-500 text-sm">{job.company}</p>
                                    <p className="text-gray-500 -mt-1 text-sm">{job.location}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {Object.entries(job.benefits).map(([key, value]) => (
                                            key === "salary" ? (
                                                <p className={aditionalDetailsStyle}>{numberFormater.format(value as number)}</p>
                                            ) : key === "hours" ? (
                                                <p className={aditionalDetailsStyle}>{value} hrs</p>
                                            ) : key === "schedule" ? (
                                                <p className={aditionalDetailsStyle}>{value}</p>
                                            ) : key === "startDate" ? (
                                                <p className={aditionalDetailsStyle}>{value}</p>
                                            ) : key === "endDate" ? (
                                                <p className={aditionalDetailsStyle}>{value}</p>
                                            ) : (
                                                <p className={aditionalDetailsStyle}>{value}</p>
                                            )
                                        ))}
                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 bg-white p-6 h-full overflow-y-auto custom-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}


const aditionalDetailsStyle = "text-gray-600 font-semibold bg-gray-500/10 rounded-lg p-1.5 text-xs"
const jobCardBase = "mb-4 p-5 border-1 rounded-xl block w-full h-full transition-colors duration-300 cursor-pointer shadow-md";
const jobCardInactive = "border-gray-500/30 hover:bg-gray-500/10 hover:border-[#D5A521] hover:shadow-xl hover:border-1.5";
const jobCardActive = "bg-gray-500/10 border-[#D5A521] shadow-xl";