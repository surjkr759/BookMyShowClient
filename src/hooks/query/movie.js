import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"
import { useCity } from '../../context/CityContext'

export const useGetAllMovies = (city) => {
  return useQuery({
    queryKey: ["movies", city ?? "ALL"],
    queryFn: async () => {
      const params = city ? { city } : {};
      const res = await apiV1Instance.get("/movie", { params });
      return res?.data?.data?.movies ?? [];
    },
    enabled: true,       
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}


export const useGetMovieById = (movieId) => {
    const query = useQuery({
        queryKey: ['movies', movieId],
        queryFn: async () => {
            const { data } = await apiV1Instance.get(`/movie/${movieId}`)
            return data.data
        }
    })
    return { ...query, movie: query?.data }
    // return { ...query, title: query?.data?.title, description: query?.data?.description, language: query?.data?.language}
}


export const useGetMovieSchedule = (movieId, city) => {
  return useQuery({
    queryKey: ['movieSchedule', movieId ?? null, city ?? null],
    queryFn: async () => {
      const res = await apiV1Instance.get("/movieSchedule", {
        params: { movieId, city },
      });
      return res?.data?.data?.schedules
          ?? res?.data?.data?.movieSchedules
          ?? [];
    },
    enabled: Boolean(movieId && city),
  })
}

export const useSearchMovies = (q, city) => {
  return useQuery({
    queryKey: ["movie-search", { q, city }],
    queryFn: async () => {
      const res = await apiV1Instance.get("/movie/search", { params: { q, city } });
      return res?.data?.data?.movies ?? [];
    },
    enabled: !!q && !!city,
    staleTime: 30_000,
  });
};