import { config } from "../config/config";

export async function api<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {

    const response = await fetch(
        `${config.apiUrl}${endpoint}`,
        options
    );

    if (!response.ok) {
        throw new Error(
            `API Error: ${response.status}`
        );
    }

    return response.json();
}