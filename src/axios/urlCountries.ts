import axios from "axios";

const url = import.meta.env.VITE_PROJECT_COUNTRIES_URL;
const apiKey = import.meta.env.VITE_PROJECT_COUNTRY_STATE_CITY_API_KEY

export const APICountries = axios.create({
    baseURL: url,
    headers: {
        'X-CSCAPI-KEY': apiKey
    }
});