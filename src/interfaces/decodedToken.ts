export interface DecodedToken {
    role: string;
    id: string;
    email: string;
    exp: number;
    iat: number;
}