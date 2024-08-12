import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useGetAllMovies = () => {
    const query = useQuery({
        queryKey: ['movies'],
        queryFn: async () => {
            const { data } = await apiV1Instance.get(`/movie`)
            return data.data
        }
    })
    return { ...query, movies: query?.data?.movies, page: query?.data?.page}
}


export const useGetMovieById = (movieId) => {
    const query = useQuery({
        queryKey: ['movies', movieId],
        queryFn: async () => {
            const { data } = await apiV1Instance.get(`/movie/${movieId}`)
            return data.data
        }
    })
    return { ...query, title: query?.data?.title, description: query?.data?.description, language: query?.data?.language}
}


export const useGetMovieSchedule = (movieId) => {
    const query = useQuery({
        queryKey: ['movies', 'schedule', movieId],
        queryFn: async () => {
            const { data } = await apiV1Instance.get(`/movie/${movieId}/schedule`)
            return data.data
        }
    })
    return { ...query, schedule: query?.data?.schedule}
}