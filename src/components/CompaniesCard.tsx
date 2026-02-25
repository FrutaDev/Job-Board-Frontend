const APIBASE = import.meta.env.VITE_PROJECT_NODE_URL
import type { Company } from "../interfaces/company"

export default function CompaniesCard({ company }: { company: Company }) {
    return (
        <>
            <div className="flex items-center justify-around border border-gray-200 rounded-xl w-1/3 p-5 hover:border-[#D5A521] hover:shadow-xl hover:border-1.5 transition-all hover:bg-gray-500/8 duration-300 cursor-pointer shadow-lg">
                <img src={`${APIBASE}${company.logo}`} alt={`${company.name} logo`} className="w-45 h-45 mb-10 p-7 object-contain rounded-lg" />
                <div className="flex flex-col">
                    <strong>{company.name}</strong>
                    <p>{company.state}, {company.city}</p>
                    <p className="text-gray-500 mt-4 mb-4">{company.description.slice(0, 100)}...</p>
                    <button className="bg-[#D5A521] text-white px-4 py-2 rounded-lg hover:bg-[#D5A521]/85 hover:underline hover:underline-offset-3 transition-all duration-300 cursor-pointer">Ver más</button>
                </div>
            </div>
        </>
    );
}