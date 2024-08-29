import { Button, Input, message } from "antd"
import { useCallback, useState } from "react"
import { useCreateMovie } from "../../hooks/mutation/movie"

const CreateMovieForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { mutateAsync: createMovieAsync } = useCreateMovie()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')
    const [genre, setGenre] = useState('')
    const [releaseDate, setReleaseDate] = useState(new Date())
    const [imageUrl, setimageUrl] = useState('')



    const handleSubmit = useCallback(async (e) => {
        console.log('Title==>', title)
            console.log('Genre==>', genre)
            console.log('releaseDate==>', releaseDate)
        e.preventDefault()
        await createMovieAsync({ 
            title, 
            description, 
            language,
            genre,
            releaseDate,
            imageUrl,
        })
        //Display success message
        messageApi.info(`Movie Created Success`)

        //Reset the states
        setTitle('')
        setDescription('')
        setLanguage('')
        setGenre('')
        setReleaseDate(new Date())
        setimageUrl('')
    }, [createMovieAsync, title, description, language, genre, releaseDate, imageUrl])

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit}>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Title"
                />
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Description"
                />
                <Input
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Language"
                />
                <Input
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Genre"
                />
                <Input
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="date"
                    required
                />
                <Input
                    value={imageUrl}
                    onChange={(e) => setimageUrl(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Image URL"
                />
                <Button htmlType="submit">Submit</Button>
            </form>
        </>
        
    )
}


export default CreateMovieForm