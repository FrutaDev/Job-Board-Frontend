import { API } from "../../axios/url"

export const handlePostulate = async (jobId: string) => {
    try {
        const response = await API.post(`/jobs/${jobId}/postulate`)
        return response
    } catch (error) {
        console.error("An error has occurred", error)
    }
}

export const handleGetPostulates = async () => {
    try {
        const { data } = await API.get(`/jobs/postulates`)
        return data
    } catch (error) {
        console.error("An error has occurred", error)
    }
}

export const handleGetReceivedPostulates = async () => {
    try {
        const { data } = await API.get(`/jobs/postulates-received`)
        return data
    } catch (error) {
        console.error("An error has occurred", error)
    }
}
