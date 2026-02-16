import { useParams } from "react-router-dom";

export default function Job() {
    const { id } = useParams()
    console.log(id)

    return (
        <div className="flex flex-col h-full items-center justify-center p-10 border border-gray-500/30 rounded-xl shadow-2xl">
            <h1>Oferta de Empleo</h1>
            <p>ID: {id}</p>
        </div>
    );
}   