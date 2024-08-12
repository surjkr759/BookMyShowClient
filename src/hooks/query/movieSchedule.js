import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useGetMovieScheduleBookingUrl = (movieScheduleId) => {
    if(!movieScheduleId) return
    const query = useQuery({
        queryKey: ['movieSchedule', movieScheduleId],
        queryFn: async () => {
            const { data } = await apiV1Instance.get(`movieSchedule/${movieScheduleId}/book`)
            console.log('Data===>', data)
            return data.data
        }
    })
    return { ...query, url: query?.data?.url }
}