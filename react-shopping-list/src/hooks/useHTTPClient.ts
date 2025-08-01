import { useMemo } from "react";
import { apiBaseUrl } from "../config";
import { useAppSelector } from "../store";
import { selectToken } from "../features/auth/auth-slice";


export function useHTTPClient() {
    const token = useAppSelector(selectToken)

    return useMemo(() => ({
        get: <TResponse = unknown>(path: string): Promise<TResponse> => {
            return fetch(apiBaseUrl + path, {
                        headers: {
                            'authorization': `bearer ${token}`
                        }
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error(`Request failed with status ${response.status}`);
                        }
                
                        return response.json();
                    })
        },
        post: <TResponse = unknown, TBody = unknown>(path: string, body: TBody): Promise<TResponse> => {
            return fetch(apiBaseUrl + path, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `bearer ${token}`
                        },
                        body: JSON.stringify(body)
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error(`Request failed with status ${response.status}`);
                        }
                
                        return response.json();
                    })
        },
        put: <TResponse = unknown, TBody = unknown>(path: string, body: TBody): Promise<TResponse> => {
            return fetch(apiBaseUrl + path, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `bearer ${token}`
                        },
                        body: JSON.stringify(body)
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error(`Request failed with status ${response.status}`);
                        }
                
                        return response.json();
                    })
        },
        delete: <TResponse = unknown>(path: string): Promise<TResponse> => {
            return fetch(apiBaseUrl + path, {
                        method: 'DELETE',
                        headers: {
                            'authorization': `bearer ${token}`
                        }
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error(`Request failed with status ${response.status}`);
                        }
                
                        return response.json();
                    })
        }
    }), [token]);
}