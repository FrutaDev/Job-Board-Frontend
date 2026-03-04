import { FiDownload, FiUser, FiBriefcase, FiMail, FiCalendar } from "react-icons/fi";
import { APIBASE } from "../../constants/APIBASE";
import { handlePostPostulate } from "../../helpers/jobs/handlePostulate";
import { useEffect } from "react";

export default function PostulationReceivedComponent({ postulate }: { postulate: any }) {
    useEffect(() => {
        console.log(postulate)
    }, [postulate])
    const getDownloadUrl = (path: string) => `${APIBASE}${path}`;

    return (
        <div className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-[#D5A521]/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                <div className="flex items-start gap-4 flex-1">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {postulate.user?.name} {postulate.user?.lastName}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                            <FiMail className="flex-shrink-0" />
                            <span className="truncate max-w-[180px]">{postulate.user?.email}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 border-l border-gray-100 pl-0 md:pl-6">
                    <div className="flex items-center gap-2 text-gray-800 font-medium">
                        <FiBriefcase className="text-gray-400" />
                        {postulate.job?.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2 uppercase whitespace-nowrap overflow-y-hidden text-ellipsis tracking-widest">
                        {postulate?.company?.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2 uppercase tracking-widest">
                        <FiCalendar />
                        Aplicó el: {new Date(postulate.createdAt).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${postulate.status === 'approved' ? 'bg-green-50 text-green-600' : postulate.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                        {postulate.status === 'approved' ? 'Aprobado' : postulate.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                    </div>

                    <a
                        href={getDownloadUrl(postulate.user?.cv)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#D5A521] transition-all active:scale-95 shadow-lg shadow-gray-200"
                    >
                        <FiDownload />
                        CV
                    </a>
                </div>
            </div>
            <div className="flex items-center justify-center gap-20 mt-4">
                <button onClick={() => handlePostPostulate(postulate.id, "approved")}
                    className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-800  transition-all active:scale-95 shadow-lg shadow-gray-200 cursor-pointer">
                    Aceptar
                </button>
                <button onClick={() => handlePostPostulate(postulate.id, "rejected")}
                    className="bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-800 transition-all active:scale-95 shadow-lg shadow-gray-200 cursor-pointer">
                    Rechazar
                </button>
            </div>
        </div>
    );
}