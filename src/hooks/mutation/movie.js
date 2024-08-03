import { useMutation } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useCreateMovie = () => {
    const mutation = useMutation({
        mutationFn: async ({title, description, language}) => {
            const {data} = await apiV1Instance.post(`/movie`, {
                title,
                description,
                language
            })
            return data
        }
    })
    return mutation
}