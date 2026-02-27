export interface CreateEnterpriseForm {
    name: string
    rfc: string
    logo: File | null
    country: string
    state: string
    city: string
    zipCode: string
    street: string
    streetNumber: string
    email: string
    phone: string
    description: string
}