import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useGetMovieById, useGetMovieSchedule } from "../../hooks/query/movie"
import { Card, Button, Flex } from 'antd';
import MovieScheduleBooking from "./MovieScheduleBooking";
import { useCurrentUser } from "../../hooks/query/user";
import CopyCard from "./CopyCard";

const MovieById = () => {
    const { user } = useCurrentUser()
    const navigate = useNavigate()
    const { id } = useParams()
    const { movie, isLoading } = useGetMovieById(id)
    const { schedule: movieScheduleData, isLoading: movieScheduleLoading } = useGetMovieSchedule(id)

    // const [selectedSchedule, setSelectedSchedule] = useState(null)

    // const bookingQueryData = useGetMovieScheduleBookingUrl(selectedSchedule)
    // console.log('Booking Data==>', bookingQueryData)

    const handleBooking = (scheduleId) => {
        if(user) {
            navigate('/copy_card', { state: {scheduleId}})
        }
        else {
            navigate('/login_error')
            setTimeout(() => navigate('/signin'), 2 * 1000)
        }
    }

    if(isLoading || movieScheduleLoading)
        return <h1>Loading...</h1>

    return (
        <div>
            <Flex justify="left" style={{margin:"50px 0px 10px 100px" }}>
                <Card
                    hoverable
                    style={{ width: 250, marginRight: "40px"}}
                    cover={<img alt="example" src={movie.imageUrl} height="400px"/>}
                >
                </Card>
                <Flex vertical style={{marginTop: "20px"}}>
                    <h1>{movie?.title}</h1>
                    <div className="movieDetails">{movie?.language}</div>
                    <div className="movieDetails">{movie?.genre} • {movie?.releaseDate.slice(0,10)}</div>
                    <h3>About The Movie</h3>
                    <div className="movieDetails" style={{width: "900px"}}>{movie?.description}</div>
                    <br />
                    <h2>Book Tickets ↓</h2>
                </Flex>
            </Flex>
            <br />
            <div>
                <Flex gap="middle" wrap style={{margin: "-30px 0 0 40px"}}>
                    {movieScheduleData && movieScheduleData.map(e => <div key={e._id}>
                        <Card style={{ width: 300 }}>
                            <p><b>{e.theatre.theatreName}, {e.theatre.location.address}</b></p>
                            <p>{new Date(e.startTime).toLocaleString()}</p>
                            <p>Price: {e.price.toLocaleString('en-Us', {
                                style: 'currency',
                                currency: 'INR',
                            })}</p>
                            <Button onClick={eve => {
                                handleBooking(e._id)
                            }}>Book Show</Button>
                            {/* {selectedSchedule && <MovieScheduleBooking data={selectedSchedule} />} */}
                        </Card>
                    </div>)}
                </Flex>
            </div>
        </div>
    )
}

export default MovieById