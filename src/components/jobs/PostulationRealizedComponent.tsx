import { useEffect, useState } from "react"
import { handleGetPostulates } from "../../helpers/jobs/handlePostulate"
import type { Postulate } from "../../interfaces/job"

export default function PostulateRealizedComponent({ postulate }: { postulate: Postulate }) {
    const [postulates, setPostulates] = useState<Postulate[]>([])

    useEffect(() => {
        console.log(postulates)
        console.log(postulates.length)
    }, [postulates])

    useEffect(() => {
        (async () => {
            const postulates = await handleGetPostulates()
            setPostulates(postulates.postulatedWorks)
        })()
    }, [])

    return (
        <li key={postulate.id}>
            <div className="p-5 border-1 border-gray-500/30 rounded-xl block w-full h-full transition-colors duration-300 cursor-pointer shadow-md bg-white hover:bg-gray-500/10 hover:border-[#D5A521] hover:shadow-xl hover:border-1.5 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 w-full">
                    <p className="font-bold text-lg text-gray-800">{postulate.job?.title || 'Posición'}</p>
                    <p className="text-gray-500 text-sm font-medium">{postulate.company?.name || postulate.job?.company?.name || 'Empresa Confidencial'}</p>
                    {postulate.job?.location && (
                        <p className="text-gray-500 -mt-1 text-sm">{postulate.job.location}</p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                        {postulate.job?.typeOfJob?.name && (
                            <p className="text-gray-600 font-semibold bg-gray-500/10 rounded-lg w-fit p-1.5 text-xs whitespace-nowrap overflow-hidden text-ellipsis">{postulate.job.typeOfJob.name}</p>
                        )}
                        {postulate.job?.modality?.name && (
                            <p className="text-gray-600 font-semibold bg-gray-500/10 rounded-lg w-fit p-1.5 text-xs whitespace-nowrap overflow-hidden text-ellipsis">{postulate.job.modality.name}</p>
                        )}
                        {postulate.job?.salary_min != null && postulate.job?.salary_max != null && (
                            <p className="text-gray-600 font-semibold bg-gray-500/10 rounded-lg w-fit p-1.5 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                                {numberFormater.format(postulate.job.salary_min)} - {numberFormater.format(postulate.job.salary_max)} por mes
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto mt-3 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit sm:w-auto text-center ${postulate.status?.toLowerCase() === 'aceptado' ? 'bg-green-100 text-green-700' :
                        postulate.status?.toLowerCase() === 'rechazado' ? 'bg-red-100 text-red-700' :
                            'bg-[#D5A521]/20 text-[#D5A521]'
                        }`}>
                        {postulate.status || 'Pendiente'}
                    </span>
                    {postulate.createdAt && (
                        <span className="text-xs text-gray-400 font-medium">
                            Postulado: {new Date(postulate.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                    )}
                </div>
            </div>
        </li>
    )
}

const numberFormater = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
});
