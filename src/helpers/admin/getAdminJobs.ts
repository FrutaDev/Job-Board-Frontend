import { API } from "../../axios/url"

export const getAdminJobs = async () => {
    try {
        const { data } = await API.get("/admin/jobs")
        return data.jobs
    } catch (error) {
        console.error("An error has occurred", error)
    }
}