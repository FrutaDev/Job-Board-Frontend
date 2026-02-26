import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-8">
                <h1 className="text-9xl font-black text-gray-100 select-none">404</h1>
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-bold text-gray-800 w-full">
                    Página no encontrada
                </p>
            </div>

            <p className="text-gray-500 max-w-md mb-10 leading-relaxed text-lg">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>

            <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-2 bg-[#D5A521] hover:bg-[#D5A521]/90 text-white font-bold py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-xl shadow-[#D5A521]/20 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver atrás
            </button>

            <div className="mt-20 opacity-20">
                <img src="/uach-logo.png" alt="" className="h-12 grayscale" />
            </div>
        </div>
    );
}
