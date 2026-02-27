import { useEffect, useState } from "react";
import PostulationReceivedComponent from "../../components/jobs/PostulationReceivedComponent";
import { handleGetReceivedPostulates } from "../../helpers/jobs/handlePostulate";
import ListLengthZeroComponent from "../../components/jobs/ListLengthZeroComponent";

export default function PostulationReceived() {

    const [receivedPostulates, setReceivedPostulates] = useState([])

    useEffect(() => {
        console.log(receivedPostulates)
    }, [receivedPostulates])

    useEffect(() => {
        (async () => {
            const receivedPostulates = await handleGetReceivedPostulates()
            setReceivedPostulates(receivedPostulates.postulatedWorks)
        })()
    }, [])

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-4">Postulaciones recibidas</h2>
            {receivedPostulates.length === 0 ? (
                <ListLengthZeroComponent message="postulaciones" />
            ) : (
                <ul className="flex flex-col gap-4">
                    {receivedPostulates.map((postulate: any) => (
                        <li key={postulate.id}>
                            <PostulationReceivedComponent />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}