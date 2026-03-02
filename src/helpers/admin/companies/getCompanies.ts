import { API } from "../../../axios/url";

export const getCompanies = async (limit: number, page: number, search?: string) => {
    try {
        const { data } = await API.get("/jobs/companies-main-page",
            {
                params: {
                    limit,
                    page,
                    search
                }
            }
        )
        return data
    } catch (e: any) {
        console.error("An error has ocurred", e.response.data)
    }
}