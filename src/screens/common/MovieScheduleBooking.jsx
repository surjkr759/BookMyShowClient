import { useGetMovieScheduleBookingUrl } from "../../hooks/query/movieSchedule";
import { useEffect } from "react";

const MovieScheduleBooking = (props) => {
    const { url } = useGetMovieScheduleBookingUrl(props.data)

    useEffect(() => {
        if(url)
            window.location.href = url
    }, [url])
    
    return (
        <div>
        </div>
    )
}

export default MovieScheduleBooking