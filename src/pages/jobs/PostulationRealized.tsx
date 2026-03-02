import PostulateRealizedComponent from "../../components/jobs/PostulationRealizedComponent"
import ListLengthZeroComponent from "../../components/jobs/ListLengthZeroComponent"
import { useOutletContext } from "react-router-dom"

export default function PostulationRealized() {
    const { postulates } = useOutletContext<{ postulates: any[] }>()

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-4">Postulaciones realizadas</h2>
            {postulates.length > 0 ? (
                <ul className="flex flex-col gap-4">
                    {postulates.map((postulate) => (
                        <PostulateRealizedComponent key={postulate.id} postulate={postulate} />
                    ))}
                </ul>
            ) : (
                <ListLengthZeroComponent message="postulaciones" />
            )}
        </div>
    )
}