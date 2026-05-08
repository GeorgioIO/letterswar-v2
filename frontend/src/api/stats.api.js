import api from "./axios";


export function getAllStatsRequest()
{
    const response = await api.get("/api")
    return response.data
}