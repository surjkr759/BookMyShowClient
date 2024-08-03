import { useMutation } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useCreateTheatre = () => {
    const mutation = useMutation({
        mutationFn: async ({theatreName, location: {lat, lon, address}}) => {
            const data = apiV1Instance.post(`/theatre`, {
                theatreName,
                location: {
                    lat,
                    lon,
                    address
                }
            })
            return data
        }
    })
    return mutation
}