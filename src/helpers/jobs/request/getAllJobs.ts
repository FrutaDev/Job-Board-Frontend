import { API } from "../../../axios/url";

export const getAllJobsHelper = async (limit: number, page: number, token: string, search?: string) => {
    try {
        const { data } = await API.get('/jobs/get-jobs-for-requests-page', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                limit,
                page,
                search
            }
        });
        return data;
    } catch (error: any) {
        console.error(error.response.data);
    }
}

export const getAllCompaniesHelper = async (limit: number, page: number, token: string, search?: string) => {
    try {
        const { data } = await API.get('/jobs/get-companies-for-requests-page', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                limit,
                page,
                search
            }
        });
        return data;
    } catch (error: any) {
        console.error(error.response.data);
    }
}
