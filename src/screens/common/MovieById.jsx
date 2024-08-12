import { useParams } from "react-router-dom"
import { useState } from "react";
import { useGetMovieById, useGetMovieSchedule } from "../../hooks/query/movie"
import { Card, Button, Flex } from 'antd';
import MovieScheduleBooking from "./MovieScheduleBooking";
import { useGetMovieScheduleBookingUrl } from "../../hooks/query/movieSchedule";

const { Meta } = Card;

const MovieById = () => {
    const { id } = useParams()
    const { title, description, language, isLoading } = useGetMovieById(id)
    const { schedule: movieScheduleData, isLoading: movieScheduleLoading } = useGetMovieSchedule(id)

    const [selectedSchedule, setSelectedSchedule] = useState(null)

    // const bookingQueryData = useGetMovieScheduleBookingUrl(selectedSchedule)
    // console.log('Booking Data==>', bookingQueryData)

    const handleBooking = (scheduleId) => {
        setSelectedSchedule(scheduleId)
    }

    if(isLoading || movieScheduleLoading)
        return <h1>Loading...</h1>

    return (
        <div>
            <Flex justify="center">
                <Card
                    hoverable
                    style={{ width: 320 }}
                    cover={<img alt="example" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" />}
                >
                    <Meta title={title} description={description} />
                </Card>
            </Flex>
            <br />
            <div>
                <Flex gap="middle" wrap>
                    {movieScheduleData && movieScheduleData.map(e => <div key={e._id}>
                        <Card style={{ width: 300 }}>
                            <p><b>{e.theatre.theatreName}, {e.theatre.location.address}</b></p>
                            <p>{new Date(e.startTime).toLocaleString()}</p>
                            <p>Price: {e.price.toLocaleString('en-Us', {
                                style: 'currency',
                                currency: 'INR',
                            })}</p>
                            <Button onClick={eve => handleBooking(e._id)}>Book Show</Button>
                            {selectedSchedule && <MovieScheduleBooking data={selectedSchedule} />}
                        </Card>
                    </div>)}
                </Flex>
            </div>
        </div>
    )
}

export default MovieById