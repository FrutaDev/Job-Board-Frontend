import PostulationReceivedComponent from "../../components/jobs/PostulationReceivedComponent";
import ListLengthZeroComponent from "../../components/jobs/ListLengthZeroComponent";
import { useOutletContext } from "react-router-dom";

export default function PostulationReceived() {
    const { postulates } = useOutletContext<{ postulates: any[] }>()

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-4">Postulaciones recibidas</h2>
            {postulates.length === 0 ? (
                <ListLengthZeroComponent message="postulaciones" />
            ) : (
                <ul className="flex flex-col gap-4">
                    {postulates.map((postulate: any) => (
                        <li key={postulate.id}>
                            <PostulationReceivedComponent postulate={postulate} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}