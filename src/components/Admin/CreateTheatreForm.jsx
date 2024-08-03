import { Button, Input, message } from "antd"
import { useCallback, useState } from "react"
import { useCreateTheatre } from "../../hooks/mutation/theatre";

const CreateTheatreForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { mutateAsync: createTheatreAsync } = useCreateTheatre()

    const [theatreName, setTheatreName] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [address, setAddress] = useState('')

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        await createTheatreAsync({ 
            theatreName, 
            location: {
                lat,
                lon,
                address
            }
        })
        //Display success message
        messageApi.info(`Theatre Created Success`)

        //Reset the states
        setTheatreName('')
        setLat('')
        setLon('')
        setAddress('')
    }, [createTheatreAsync, theatreName, lat, lon, address])

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit}>
                <Input
                    value={theatreName}
                    onChange={(e) => setTheatreName(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Name"
                />
                <Input
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Latitude"
                />
                <Input
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Longitude"
                />
                <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ "marginBottom" : "7px"}}
                    type="text"
                    required
                    placeholder="Address"
                />
                <Button htmlType="submit">Submit</Button>
            </form>
        </>
        
    )
}


export default CreateTheatreForm