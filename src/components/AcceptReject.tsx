export default function AcceptReject({ handleAcceptReject, jobId }: { handleAcceptReject: (jobId: string, status: string) => void, jobId: string }) {
    return (
        <footer className="mt-12 gap-8 pt-8 border-t flex justify-center">
            <button onClick={() => handleAcceptReject(jobId, "accept")} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg cursor-pointer">
                Aceptar
            </button>
            <button onClick={() => handleAcceptReject(jobId, "reject")} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg cursor-pointer">
                Rechazar
            </button>
        </footer>
    )
}