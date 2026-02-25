import { useEffect, useState } from "react";
import { API } from "../../axios/url";
import JobEditor from "../../components/jobs/JobRichEditor";
import JobListEditor from "../../components/jobs/JobListEditor";

interface Form {
    title: string;
    companyId: string;
    location: string;
    salary_min: string;
    salary_max: string;
    modalityId: string;
    typeOfJobId: string;
    summary: string;
    responsibilities: string;
    requirements: string;
    benefits: string;
}

interface Feedback {
    message: string;
    code: string;
    ok: boolean;
}

export default function CreateJob() {
    const [companies, setCompanies] = useState<any[]>([]);
    const [modalities, setModalities] = useState<any[]>([]);
    const [typeOfJobs, setTypeOfJobs] = useState<any[]>([]);
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [errors, setErrors] = useState<any>(null);

    const [form, setForm] = useState<Form>({
        title: "",
        summary: "",
        responsibilities: "",
        requirements: "",
        benefits: "",
        companyId: "",
        location: "",
        salary_min: "",
        salary_max: "",
        modalityId: "",
        typeOfJobId: "",
    });

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const res = await API.get("/jobs/companies");
                setCompanies(res.data.companies);
                setModalities(res.data.modalities);
                setTypeOfJobs(res.data.typeOfJobs);
            } catch (error) {
                console.log("Error al cargar datos iniciales:", error);
            }
        }
        fetchFormData();
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: form.title,
            companyId: parseInt(form.companyId),
            location: form.location,
            salary_min: parseInt(form.salary_min),
            salary_max: parseInt(form.salary_max),
            modalityId: parseInt(form.modalityId),
            typeOfJobId: parseInt(form.typeOfJobId),
            description_html: form.summary,
            responsabilities_html: form.responsibilities,
            requirements_html: form.requirements,
            benefits_html: form.benefits,
        };

        try {
            await API.post("/jobs/create-job", payload);
            console.log("Vacante creada con éxito");
            setFeedback({
                message: "Vacante creada con éxito",
                code: "success",
                ok: true,
            });
        } catch (error: any) {
            console.error(error);
            setFeedback({
                message: error.response.data.message,
                code: "error",
                ok: false,
            });
        } finally {
            setForm({
                title: "",
                summary: "",
                responsibilities: "",
                requirements: "",
                benefits: "",
                companyId: "",
                location: "",
                salary_min: "",
                salary_max: "",
                modalityId: "",
                typeOfJobId: "",
            })
            window.scrollTo(0, 0)
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mt-5 mb-10">
            <header className="mb-8 border-b border-gray-100 pb-5">
                <h1 className="text-3xl font-extrabold text-gray-800">Publicar Empleo</h1>
                <p className="text-gray-500/60 text-sm mt-2 font-medium">
                    Completa la información para que los candidatos conozcan tu oferta.
                </p>
                <p className="text-gray-500/60 text-sm font-medium">
                    Todos los campos son obligatorios.
                </p>
            </header>

            <form onSubmit={submit} className="flex flex-col gap-8">

                <div className="space-y-4">
                    {feedback?.message && (
                        <span className={`text-md ml-1 ${feedback.ok ? "text-green-500" : "text-red-500"}`}>
                            {feedback.message}
                        </span>
                    )}
                    <h2 className="text-lg font-bold text-gray-700 border-l-4 border-[#D5A521] pl-3">General</h2>
                    <div className={groupStyle}>
                        <label className={labelStyle}>Título del Puesto</label>
                        <input
                            className={inputStyle}
                            type="text"
                            placeholder="Ej: Practicante de contabilidad"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={groupStyle}>
                            <label className={labelStyle}>Empresa que publica</label>
                            <select
                                className={inputStyle}
                                value={form.companyId}
                                onChange={(e) => setForm({ ...form, companyId: e.target.value })}
                                required
                            >
                                <option value="">Selecciona una empresa</option>
                                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className={groupStyle}>
                            <label className={labelStyle}>Ubicación (Ciudad, Estado)</label>
                            <input
                                className={inputStyle}
                                type="text"
                                placeholder="Ej: Chihuahua, Chih."
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-700 border-l-4 border-[#D5A521] pl-3">Condiciones Laborales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={groupStyle}>
                            <label className={labelStyle}>Modalidad</label>
                            <select
                                className={inputStyle}
                                value={form.modalityId}
                                onChange={(e) => setForm({ ...form, modalityId: e.target.value })}
                                required
                            >
                                <option value="">Selecciona modalidad</option>
                                {modalities.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>
                        <div className={groupStyle}>
                            <label className={labelStyle}>Tipo de Empleo</label>
                            <select
                                className={inputStyle}
                                value={form.typeOfJobId}
                                onChange={(e) => setForm({ ...form, typeOfJobId: e.target.value })}
                                required
                            >
                                <option value="">Selecciona tipo</option>
                                {typeOfJobs.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={groupStyle}>
                            <label className={labelStyle}>Sueldo Mínimo Mensual (solo ingresar números)</label>
                            <input
                                className={inputStyle}
                                type="number"
                                min={0}
                                placeholder="$0.00"
                                value={form.salary_min}
                                onChange={(e) => setForm({ ...form, salary_min: e.target.value })}
                                required
                            />
                        </div>
                        <div className={groupStyle}>
                            <label className={labelStyle}>Sueldo Máximo Mensual (solo ingresar números)</label>
                            <input
                                className={inputStyle}
                                type="number"
                                min={0}
                                placeholder="$0.00"
                                value={form.salary_max}
                                onChange={(e) => setForm({ ...form, salary_max: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-700 border-l-4 border-[#D5A521] pl-3">Detalle de la Vacante</h2>

                    <div className={groupStyle}>
                        <label className={labelStyle}>Resumen / Descripción</label>
                        <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#D5A521]/20">
                            <JobEditor
                                value={form.summary}
                                onChange={(html) => setForm({ ...form, summary: html })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className={groupStyle}>
                            <label className={labelStyle}>Responsabilidades (Lista)</label>
                            <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#D5A521]/20">
                                <JobListEditor
                                    value={form.responsibilities}
                                    onChange={(html) => setForm({ ...form, responsibilities: html })}
                                />
                            </div>
                        </div>

                        <div className={groupStyle}>
                            <label className={labelStyle}>Requisitos (Lista)</label>
                            <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#D5A521]/20">
                                <JobListEditor
                                    value={form.requirements}
                                    onChange={(html) => setForm({ ...form, requirements: html })}
                                />
                            </div>
                        </div>

                        <div className={groupStyle}>
                            <label className={labelStyle}>Beneficios y Prestaciones (Lista)</label>
                            <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#D5A521]/20">
                                <JobListEditor
                                    value={form.benefits}
                                    onChange={(html) => setForm({ ...form, benefits: html })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 bg-[#D5A521] hover:bg-[#b38a1a] cursor-pointer text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-[#D5A521]/30 active:scale-95 text-lg uppercase tracking-wider"
                >
                    Publicar Vacante
                </button>
            </form>
        </div>
    );
}

const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#D5A521] focus:ring-4 focus:ring-[#D5A521]/10 transition-all duration-200 text-sm font-medium text-gray-700";
const labelStyle = "text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2";
const groupStyle = "flex flex-col w-full";