import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useGetMovieScheduleBookingUrl = (movieScheduleId) => {
  if (!movieScheduleId) return;
  const query = useQuery({
    queryKey: ['movieSchedule', movieScheduleId],
    queryFn: async () => {
      const { data } = await apiV1Instance.get(`movieSchedule/${movieScheduleId}/book`)
      return data.data
    }
  })
  return { ...query, url: query?.data?.url }
}

// List schedules for a movie (optionally filtered by city)
export function useGetMovieSchedules(movieId, city) {
  return useQuery({
    queryKey: ["movieSchedule", { movieId, city }],
    queryFn: async () => {
      const res = await apiV1Instance.get("/movieSchedule", {
        params: { movieId, city },
      });

      const d = res?.data?.data;
      if (Array.isArray(d)) return d;  
      return (
        d?.movieSchedules ||                            // preferred new shape
        d?.schedules ||                                 // other legacy shape
        d?.schedule ||                                  // singular key from /movie/:id/schedule
        []                                              // fallback
      );
    },
    enabled: Boolean(movieId), // if your server REQUIRES city, change to Boolean(movieId && city)
    staleTime: 30_000,
  });
}
