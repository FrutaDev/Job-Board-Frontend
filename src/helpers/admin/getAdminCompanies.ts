import { API } from "../../axios/url"

export const getAdminCompanies = async () => {
    try {
        const { data } = await API.get("/admin/companies")
        return data.companies
    } catch (error) {
        console.error("An error has occurred", error)
    }
}