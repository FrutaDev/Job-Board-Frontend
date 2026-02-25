import { API } from "../axios/url";

export const getCompanies = async () => {
    try {
        const { data } = await API.get("/jobs/companies-main-page")
        return data.companies
    } catch (e) {
        console.error("An error has ocurred", e)
    }
}