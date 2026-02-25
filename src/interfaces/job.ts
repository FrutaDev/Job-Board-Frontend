export interface Job {
    id: number;
    title: string;
    description_html: string;
    salary_min: number;
    salary_max: number;
    location: string;
    typeOfJob: {
        name: string;
    };
    company: {
        name: string;
    };
    createdAt: string;
    updatedAt: string;
    modality: {
        name: string;
    }
    responsabilities_html: string;
    requirements_html: string;
    benefits_html: string;
}