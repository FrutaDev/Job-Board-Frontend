export default function ApplyNow({ handleApply, jobId }: { handleApply: (jobId: string) => void, jobId: string }) {
    return (
        <footer className="mt-12 pt-8 border-t flex justify-center">
            <button onClick={() => handleApply(jobId)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg cursor-pointer">
                Postularme ahora
            </button>
        </footer>
    )
}