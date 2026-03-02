import { API } from "../../axios/url"

export const getAdminJobs = async (page: number, limit: number, token: string, search?: string) => {
    try {
        const { data } = await API.get("/admin/jobs", {
            params: {
                page,
                limit,
                search
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.error("An error has occurred", error)
    }
}