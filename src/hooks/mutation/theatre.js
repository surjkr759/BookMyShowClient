import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useCreateTheatre = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async ({theatreName, location: {lat, lon, city, address}}) => {
            const data = apiV1Instance.post(`/theatre`, {
                theatreName,
                location: {
                    lat,
                    lon,
                    city,
                    address
                }
            })
            return data
        }, onSuccess: () => queryClient.invalidateQueries({queryKey: ['theatre']})
    })
    return mutation
}