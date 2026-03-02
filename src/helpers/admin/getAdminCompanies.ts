import { API } from "../../axios/url"

export const getAdminCompanies = async (page: number, limit: number, token: string, search?: string) => {
    try {
        const { data } = await API.get("/admin/companies", {
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