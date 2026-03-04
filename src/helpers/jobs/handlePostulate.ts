import { data } from "react-router-dom"
import { API } from "../../axios/url"

export const handlePostulate = async (jobId: string) => {
    try {
        const response = await API.post(`/jobs/${jobId}/postulate`)
        return response
    } catch (error: any) {
        console.error("An error has occurred", error.response.data)
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


export const handlePostPostulate = async (postulateId: string, status: string) => {
    try {
        console.log(postulateId, status)
        const { data } = await API.put(`jobs/postulate/`, {
            data: {
                status,
                postulateId,
            },
        })
        return data
    } catch (error) {
        console.error("An error has occurred", error)
    }
}

export const handleAcceptRejectJob = async (jobId: string, status: string) => {
    const { data } = await API.post(`admin/job/${jobId}/approve`, { status })
    return data
}

export const handleAcceptRejectCompany = async (companyId: string, status: string) => {
    const { data } = await API.post(`admin/company/${companyId}/approve`, { status })
    return data
}