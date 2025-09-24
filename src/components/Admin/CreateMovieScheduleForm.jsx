import { Button, Input, message, Select } from "antd"
import { useCallback, useState } from "react"
import { useGetAllTheatres } from "../../hooks/query/theatre"
import { useGetAllMovies } from "../../hooks/query/movie"
import { useQueryClient } from "@tanstack/react-query";
import { useCity } from "../../context/CityContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCreateMovieSchedule } from "../../hooks/mutation/movieSchedule";


const CreateMovieScheduleForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [startDate, setStartDate] = useState(new Date());
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [selectedTheatreId, setSelectedTheatreId] = useState('');
    const [price, setPrice] = useState(0);

    const queryClient = useQueryClient();
    const { city } = useCity?.() || {};

    const { theatres, isLoading: theatreLoading } = useGetAllTheatres()
    const { data: movies = [], isLoading: movieLoading } = useGetAllMovies()
    const { mutateAsync: createMovieScheduleAsync, isPending, isLoading } = useCreateMovieSchedule();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        try {
            await createMovieScheduleAsync({
                movieId: selectedMovieId,
                theatreId: selectedTheatreId,
                startTime: startDate.toISOString(),
                price: Number(price),
            });

            queryClient.invalidateQueries({ queryKey: ["movieSchedule"] });
            if (selectedMovieId) {
                queryClient.invalidateQueries({ queryKey: ["movieSchedule", { movieId: selectedMovieId, city }] });
                queryClient.invalidateQueries({ queryKey: ["movie-schedules", { movieId: selectedMovieId, city }] }); // if used anywhere
                queryClient.invalidateQueries({ queryKey: ["movies", city ?? "ALL"] });
            }

            messageApi.success('Schedule created');
            setSelectedMovieId('');
            setSelectedTheatreId('');
            setPrice('');
            setStartDate(new Date());
        } catch (err) {
            const msg = err?.response?.data?.error || 'Failed to create schedule';
            messageApi.error(String(msg));
        }
    }, [createMovieScheduleAsync, messageApi, selectedMovieId, selectedTheatreId, startDate, price, queryClient, city])

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
                <Select
                    value={selectedMovieId || undefined}
                    onChange={setSelectedMovieId}
                    placeholder="Select movie"
                    loading={movieLoading}
                    options={(movies || []).map(m => ({ 
                        value: m._id,
                        label: m.title || m.name || m.movieName || "Untitled"
                     }))}
                />
                <Select
                    value={selectedTheatreId || undefined}
                    onChange={setSelectedTheatreId}
                    placeholder="Select theatre"
                    loading={theatreLoading}
                    options={(theatres || []).map(t => ({ value: t._id, label: t.theatreName }))}
                />
                <DatePicker selected={startDate} onChange={setStartDate} showTimeSelect dateFormat="Pp" />
                <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" placeholder="Price" />
                <Button htmlType="submit" loading={Boolean(isPending || isLoading)}>Submit</Button>
            </form>
        </>

    )
}


export default CreateMovieScheduleForm