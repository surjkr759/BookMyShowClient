import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useGetAllTheatres = () => {
    const query = useQuery({
        queryKey: ['theatre'],
        queryFn: async () => {
            console.log('Inside query fn')
            const { data } = await apiV1Instance.get(`/theatre`)
            console.log('Data ==> ', data)
            return data.data
        }
    })
    return { ...query, theatres: query?.data?.theatres, page: query?.data?.page }
}