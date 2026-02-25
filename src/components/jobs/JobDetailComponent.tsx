import type { Job } from "../../interfaces/job";

export default function JobDetailComponent({ job }: { job: Job }) {
    return (
        <>
            <header className="border-b pb-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                        <p className="text-xl text-blue-600 font-medium">{job.company.name}</p>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
                        {job.modality.name} • {job.typeOfJob.name}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 bg-gray-50 p-6 rounded-xl">
                <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">Ubicación</h4>
                    <p className="text-gray-800">{job.location}</p>
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">Rango Salarial</h4>
                    <p className="text-gray-800 font-semibold">
                        {job.salary_min.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} -
                        {job.salary_max.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                    </p>
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">Tipo de Contrato</h4>
                    <p className="text-gray-800">{job.typeOfJob.name}</p>
                </div>
            </div>

            <div className="space-y-10">
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-[#D5A521] pl-3">Descripción del puesto</h3>
                    <div className="prose prose-blue max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: job.description_html }} />
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-[#D5A521] pl-3">Requisitos</h3>
                        <div className="prose prose-sm text-gray-600" dangerouslySetInnerHTML={{ __html: job.requirements_html }} />
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-[#D5A521] pl-3">Responsabilidades</h3>
                        <div className="prose prose-sm text-gray-600" dangerouslySetInnerHTML={{ __html: job.responsabilities_html }} />
                    </section>
                </div>

                <section className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                    <h3 className="text-xl font-bold text-yellow-800 mb-3">Beneficios de trabajar con nosotros</h3>
                    <div className="prose prose-sm text-yellow-900/80" dangerouslySetInnerHTML={{ __html: job.benefits_html }} />
                </section>
            </div>
        </>
    );
}