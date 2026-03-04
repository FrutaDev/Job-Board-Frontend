import { useOutletContext } from "react-router-dom";
import ListLengthZeroComponent from "../../components/jobs/ListLengthZeroComponent";
import PostulationRealizedComponent from "../../components/jobs/PostulationRealizedComponent";

export default function PostulationRealized() {
    const { postulates } = useOutletContext<{ postulates: any[] }>();

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Postulaciones
                    </h2>
                    <p className="text-gray-500 mt-1">Gestiona los candidatos que han aplicado a tus vacantes.</p>
                </div>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                    {postulates.length} Total
                </span>
            </header>

            {postulates.length === 0 ? (
                <ListLengthZeroComponent message="postulaciones" />
            ) : (
                <div className="grid gap-4">
                    {postulates.map((postulate: any) => (
                        <PostulationRealizedComponent key={postulate.id} postulate={postulate} />
                    ))}
                </div>
            )}
        </div>
    );
}