import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useCreateMovie = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async ({title, description, language, genre, releaseDate, imageUrl}) => {
            
            const {data} = await apiV1Instance.post(`/movie`, {
                title,
                description,
                language,
                genre,
                releaseDate,
                imageUrl,
            })
            return data
        }, onSuccess: () => queryClient.invalidateQueries({queryKey: ['movies']})
    })
    return mutation
}