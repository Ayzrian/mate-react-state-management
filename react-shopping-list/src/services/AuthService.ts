import { apiBaseUrl } from "../config";

export function authenticate(username: string, password: string): Promise<{
    token: string;
}> {
    return fetch(apiBaseUrl + '/api/v1/authenticate', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    })
}