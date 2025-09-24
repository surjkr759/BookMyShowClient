import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useGetAllTheatres = () => {
    const query = useQuery({
        queryKey: ['theatre'],
        queryFn: async () => {
            const { data } = await apiV1Instance.get(`/theatre`)
            return data.data
        }
    })
    return { ...query, theatres: query?.data?.theatres, page: query?.data?.page }
}

export const useGetAllCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data } = await apiV1Instance.get('/theatre/cities');
      return data?.data?.cities ?? [];
    },
    staleTime: 60_000
  });
};