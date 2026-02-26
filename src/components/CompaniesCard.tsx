const APIBASE = import.meta.env.VITE_PROJECT_NODE_URL
import type { Company } from "../interfaces/company"

export default function CompaniesCard({ companies }: { companies: Company[] | null }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto w-full">
            {companies?.map((company: Company) => (
                <div
                    key={company.id}
                    className="flex flex-col sm:flex-row items-center sm:items-start border border-gray-200 rounded-xl 
                               w-full p-5 bg-white
                               hover:border-[#D5A521] hover:shadow-xl transition-all 
                               hover:bg-gray-50 duration-300 cursor-pointer shadow-md gap-4"
                >
                    <div className="flex-shrink-0 bg-white rounded-lg p-2 border border-gray-100 shadow-sm flex items-center justify-center">
                        <img
                            src={`${APIBASE}${company.logo}`}
                            alt={`${company.name} logo`}
                            className="w-24 h-24 object-contain"
                        />
                    </div>

                    <div className="flex flex-col text-center sm:text-left overflow-hidden w-full">
                        <strong className="text-lg text-gray-800 truncate block">
                            {company.name}
                        </strong>
                        <p className="text-sm text-gray-600 truncate">
                            {company.state}, {company.city}
                        </p>
                        <p className="text-gray-500 mt-3 text-sm leading-relaxed line-clamp-3">
                            {company.description}
                        </p>
                        <button className="bg-[#D5A521] text-white w-full px-4 py-2 rounded-lg hover:bg-[#D5A521]/85 hover:underline hover:underline-offset-3 transition-all duration-300 cursor-pointer">Ver más</button>
                    </div>
                </div>
            ))}
        </div>
    );
}