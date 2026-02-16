import { useState } from "react";
import { API } from "../axios/url";
import JobEditor from "../components/jobs/JobRichEditor";
import JobListEditor from "../components/jobs/JobListEditor";

export default function CreateJob() {
    const [form, setForm] = useState({
        title: "",
        summary: "",
        responsibilities: "",
        requirements: "",
        benefits: ""
    });

    const inputStyle = "w-full p-3 bg-transparent border rounded-lg outline-none focus:border-[#D5A521] text-sm";
    const labelStyle = "text-xs font-semibold text-gray-500 uppercase ml-1 mb-1";
    const groupStyle = "flex flex-col gap-1 w-full";

    const submit = async (e: any) => {
        e.preventDefault();
        try {
            await API.post("/jobs", form);
            alert("Empleo creado con éxito");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100 mt-5 mb-10">
            <header className="mb-8 border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Crear Nueva Vacante</h1>
                <p className="text-gray-500 text-sm">Por favor mantén como lista los campos marcados.</p>
                <p className="text-gray-500 text-sm">* Todos los campos son obligatorios.</p>
            </header>

            <form onSubmit={submit} className="flex flex-col gap-5">

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

                <div className={groupStyle}>
                    <label className={labelStyle}>Resumen de la posición</label>
                    <div className="border rounded-lg p-2 min-h-[150px] focus-within:border-[#D5A521]">
                        <JobEditor
                            value={form.summary}
                            onChange={(html) => setForm({ ...form, summary: html })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={groupStyle}>
                        <label className={labelStyle}>Responsabilidades</label>
                        <div className="border rounded-lg p-2 min-h-[200px] focus-within:border-[#D5A521]">
                            <JobListEditor
                                value={form.responsibilities}
                                onChange={(html) => setForm({ ...form, responsibilities: html })}
                            />
                        </div>
                    </div>
                    <div className={groupStyle}>
                        <label className={labelStyle}>Requisitos</label>
                        <div className="border rounded-lg p-2 min-h-[200px] focus-within:border-[#D5A521]">
                            <JobListEditor
                                value={form.requirements}
                                onChange={(html) => setForm({ ...form, requirements: html })}
                            />
                        </div>
                    </div>
                </div>

                <div className={groupStyle}>
                    <label className={labelStyle}>Beneficios y Prestaciones</label>
                    <div className="border rounded-lg p-2 min-h-[200px] focus-within:border-[#D5A521]">
                        <JobListEditor
                            value={form.benefits}
                            onChange={(html) => setForm({ ...form, benefits: html })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-[#D5A521] hover:bg-[#b38a1a] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#D5A521]/20 active:scale-95 cursor-pointer"
                >
                    Publicar Empleo
                </button>
            </form>
        </div>
    );
}