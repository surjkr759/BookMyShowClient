import { Button, Input, message, Select } from "antd"
import { useCallback, useState } from "react"
import { useGetAllTheatres } from "../../hooks/query/theatre"
import { useGetAllMovies } from "../../hooks/query/movie"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCreateMovieSchedule } from "../../hooks/mutation/movieSchedule";


const CreateMovieScheduleForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [selectedTheatreId, setSelectedTheatreId] = useState('');
    const [price, setPrice] = useState(0);

    const { theatres, isLoading: theatreLoading } = useGetAllTheatres()
    const { movies, isLoading: movieLoading } = useGetAllMovies()
    const { mutateAsync: createMovieScheduleAsync} = useCreateMovieSchedule()


    console.log('==> ', movies)

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        await createMovieScheduleAsync({
            movieId: selectedMovieId,
            theatreId: selectedTheatreId,
            startTime: startDate.toISOString(),
            price: parseInt(price)
        })

        messageApi.info(`Movie Schedule Created Success`)

        setStartDate(new Date())
        setSelectedMovieId('')
        setSelectedTheatreId('')
        setPrice(0)
    }, [createMovieScheduleAsync, selectedMovieId, selectedTheatreId, startDate, price])

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit}>
                <Select
                    value={selectedTheatreId}
                    onChange={(e) => setSelectedTheatreId(e)}
                    style={{ width: '100%', marginBottom: '7px' }}
                    options={theatres?.map((e) => ({ value: e._id, label: e.theatreName }))}
                    loading={theatreLoading}
                />
                <Select
                    value={selectedMovieId}
                    onChange={(e) => setSelectedMovieId(e)}
                    style={{ width: '100%', marginBottom: '7px' }}
                    options={movies?.map((e) => ({ value: e._id, label: e.title }))}
                    loading={movieLoading}
                />
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                />
                <div style={{ margin: "5px 0" }}></div>
                <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    required
                    placeholder="Price"
                />
                <div style={{ margin: "5px 0" }}></div>
                <Button htmlType="submit">Submit</Button>
            </form>
        </>

    )
}


export default CreateMovieScheduleForm