import { useGetMovieScheduleBookingUrl } from "../../hooks/query/movieSchedule";
import { useEffect } from "react";
import '../../App.css';

const MovieScheduleBooking = (props) => {
    const { url } = useGetMovieScheduleBookingUrl(props.data)

    useEffect(() => {
        if(url)
            window.location.href = url
    }, [url])
    
    return (
        // <div className="container">
        //     <h3>Please use below Test Card credentials for doing the payment</h3>
        //     <div>Card number: 4242424242424242</div>
        //     <div>CVC: Any 3 digits</div>
        //     <div>Date: Any future date</div>
        // </div>
        <></>
    )
}

export default MovieScheduleBooking