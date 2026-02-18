import { useEffect, useState } from "react"
import { APICountries } from "../../axios/urlCountries"
import { API } from "../../axios/url"

interface CreateEnterpriseForm {
    name: string
    rfc: string
    logo: string
    country: string
    state: string
    city: string
    zipCode: string
    street: string
    streetNumber: string
    email: string
    phone: string
}

type FieldErrors = {
    [K in keyof CreateEnterpriseForm]?: string
}

export default function CreateEnterprise() {
    const [form, setForm] = useState<CreateEnterpriseForm>({
        name: '', rfc: '', country: '', state: '', city: '', zipCode: '',
        street: '', streetNumber: '', email: '', phone: '', logo: '',
    })
    const [countries, setCountries] = useState<string[]>([])
    const [states, setStates] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [errors, setErrors] = useState<FieldErrors>({})
    const [globalError, setGlobalError] = useState<string | null>(null)

    useEffect(() => {
        console.log(errors)
    }, [errors])

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countries = await APICountries.get('/countries')
                countries.data.sort((a: any, b: any) => a.name.localeCompare(b.name))
                setCountries(countries.data.map((country: any) => country.name + ' - ' + country.iso2))
            } catch (error: any) {
                console.log(error.response.data)
            }
        }
        fetchCountries()
    }, [])

    const handleCountryChange = async (country: string) => {
        setStates([]);
        setCities([]);
        const states = await APICountries.get(`/countries/${country}/states`)
        setStates(states.data.map((state: any) => state.name + ' - ' + state.iso2))
    }

    const handleStateChange = async (state: string) => {
        const cities = await APICountries.get(`/countries/${form.country}/states/${state}/cities`)
        setCities(cities.data.map((city: any) => city.name))
    }



    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await API.post('/jobs/create-company', form)
            setErrors(response.data)
        } catch (error: any) {
            console.error(error.response.data)
            if (!error.response) {
                setGlobalError("Error de conexión")
                return
            }

            if (error.response.data.code === "VALIDATION_ERROR") {
                const map: FieldErrors = {}

                for (const err of error.response.data.errors) {
                    map[err.field as keyof CreateEnterpriseForm] = err.message
                }

                setErrors(map)
                return
            }

            if (error.response.status === 403) {
                setGlobalError("No tienes permiso para crear una empresa")
                return
            }

            setGlobalError("Ocurrió un error inesperado")
        } finally {
            setForm({
                name: '', rfc: '', country: '', state: '', city: '', zipCode: '',
                street: '', streetNumber: '', email: '', phone: '', logo: '',
            })
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mt-5 mb-10">
            <header className="mb-8 border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Alta de Empresa</h1>
                <p className="text-gray-400 text-sm italic">Campos obligatorios marcados con <span className="text-red-500">*</span>.</p>
            </header>

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {errors.ok && (
                        <span className="text-green-500 text-md -mt-3 ml-1">{errors.message}</span>
                    )}

                    <div className={`${groupStyle} md:col-span-2`}>
                        {errors.name && (
                            <span className="text-red-500">{errors.name}</span>
                        )}
                        <label className={labelStyle}>Nombre de la Empresa <span className="text-red-500">*</span></label>
                        <input
                            className={`${inputStyle} ${errors.name ? inputErrorBorder : ""}`}
                            type="text"
                            placeholder="Ej: Universidad Autónoma de Chihuahua"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className={groupStyle}>
                        {errors.rfc && (
                            <span className={errorStyle}>{errors.rfc}</span>
                        )}
                        <label className={labelStyle}>RFC <span className="text-red-500">*</span></label>
                        <input
                            className={`${inputStyle} ${errors.rfc ? inputErrorBorder : ""}`}
                            type="text"
                            placeholder="Ej: XAXX010101000"
                            value={form.rfc}
                            onChange={(e) => setForm({ ...form, rfc: e.target.value })}
                            required
                        />
                    </div>
                    <div className={groupStyle}>
                        {errors.logo && (
                            <span className={errorStyle}>{errors.logo}</span>
                        )}
                        <label className={labelStyle}>Logo de la empresa</label>
                        <input
                            className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                            type="file"
                            onChange={(e) => setForm({ ...form, logo: e.target.value })}
                        />
                    </div>
                </div>

                <hr className="border-gray-50" />

                <h2 className="text-sm font-bold text-gray-700 -mb-2">Dirección Fiscal </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className={groupStyle}>
                        {errors.country && (
                            <span className={errorStyle}>{errors.country}</span>
                        )}
                        <label className={labelStyle}>País <span className="text-red-500">*</span></label>
                        <select
                            className={`${inputStyle} ${errors.country ? inputErrorBorder : ""}`}
                            value={form.country}
                            onChange={(e) => {
                                handleCountryChange(e.target.value)
                                setForm({ ...form, country: e.target.value })
                            }}
                            required
                        >
                            <option value="">Selecciona un país</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.split(' - ')[1]}>
                                    {country.split(' - ')[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={groupStyle}>
                        {errors.state && (
                            <span className={errorStyle}>{errors.state}</span>
                        )}
                        <label className={labelStyle}>Estado <span className="text-red-500">*</span></label>
                        <select
                            className={`${inputStyle} ${errors.state ? inputErrorBorder : ""}`}
                            value={form.state}
                            onChange={(e) => {
                                handleStateChange(e.target.value)
                                setForm({ ...form, state: e.target.value })
                            }}
                            required
                        >
                            <option value="">Selecciona un estado</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.split(' - ')[1]}>
                                    {state.split(' - ')[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={groupStyle}>
                        {errors.city && (
                            <span className={errorStyle}>{errors.city}</span>
                        )}
                        <label className={labelStyle}>Ciudad <span className="text-red-500">*</span></label>
                        <select
                            className={`${inputStyle} ${errors.city ? inputErrorBorder : ""}`}
                            value={form.city}
                            onChange={(e) => {
                                setForm({ ...form, city: e.target.value })
                            }}
                            required
                        >
                            <option value="">Selecciona una ciudad</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={groupStyle}>
                        {errors.zipCode && (
                            <span className={errorStyle}>{errors.zipCode}</span>
                        )}
                        <label className={labelStyle}>CP <span className="text-red-500">*</span></label>
                        <input
                            className={`${inputStyle} ${errors.zipCode ? inputErrorBorder : ""}`}
                            type="text"
                            placeholder="Ej: 31000"
                            value={form.zipCode}
                            onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                            required
                        />
                    </div>
                    <div className={`${groupStyle} col-span-2`}>
                        {errors.street && (
                            <span className={errorStyle}>{errors.street}</span>
                        )}
                        <label className={labelStyle}>Calle <span className="text-red-500">*</span></label>
                        <input
                            className={`${inputStyle} ${errors.street ? inputErrorBorder : ""}`}
                            type="text"
                            placeholder="Ej: Calle Escorza"
                            value={form.street}
                            onChange={(e) => setForm({ ...form, street: e.target.value })}
                            required
                        />
                    </div>
                    <div className={groupStyle}>
                        {errors.streetNumber && (
                            <span className={errorStyle}>{errors.streetNumber}</span>
                        )}
                        <label className={labelStyle}>Número <span className="text-red-500">*</span></label>
                        <input
                            className={`${inputStyle} ${errors.streetNumber ? inputErrorBorder : ""}`}
                            type="text"
                            placeholder="Ej: 900"
                            value={form.streetNumber}
                            onChange={(e) => setForm({ ...form, streetNumber: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <hr className="border-gray-50" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={groupStyle}>
                        {errors.email && (
                            <span className={errorStyle}>{errors.email}</span>
                        )}
                        <label className={labelStyle}>Correo de contacto <span className="text-red-500">*</span></label>
                        <input
                            className={`${inputStyle} ${errors.email ? inputErrorBorder : ""}`}
                            type="email"
                            placeholder="Ej: contacto@empresa.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className={groupStyle}>
                        {errors.phone && (
                            <span className={errorStyle}>{errors.phone}</span>
                        )}
                        <label className={labelStyle}>Teléfono de contacto <span className="text-red-500">*</span></label>
                        <input
                            className={`${inputStyle} ${errors.phone ? inputErrorBorder : ""}`}
                            type="tel"
                            placeholder="Ej: 6141234567"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 bg-[#D5A521] hover:bg-[#b38a1a] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-[#D5A521]/20 active:scale-95 cursor-pointer"
                >
                    Registrar Empresa
                </button>
            </form>
        </div >
    )
}


const inputStyle = "w-full p-2.5 bg-transparent border border-gray-500/30 rounded-lg outline-none focus:border-[#D5A521] transition-all duration-200 text-sm";
const labelStyle = "text-xs font-semibold text-gray-500 uppercase ml-1 mb-1";
const groupStyle = "flex flex-col w-full relative pb-5";
const errorStyle = "text-[10px] text-red-500 absolute -bottom-0.5 left-1 font-medium animate-in fade-in slide-in-from-top-1 duration-200";
const inputErrorBorder = "border-red-400 focus:border-red-500 bg-red-50/10";