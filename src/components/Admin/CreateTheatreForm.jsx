import { Button, Input, message } from "antd"
import { useCallback, useState } from "react"
import { useCreateTheatre } from "../../hooks/mutation/theatre";

const CreateTheatreForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { mutateAsync: createTheatreAsync, isPending } = useCreateTheatre()

    const [theatreName, setTheatreName] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    const reset = () => {
        setTheatreName(''); setLat(''); setLon(''); setCity(''); setAddress('');
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        try {
            await createTheatreAsync({ 
                theatreName, 
                location: {
                    lat,
                    lon,
                    city,
                    address
                }
            })
            //Display success message
            messageApi.success(`Theatre Created`)
            reset();
        } catch (err) {
            const msg = err?.response?.data?.error || 'Failed to create theatre';
            messageApi.error(String(msg));
        }
        
    }, [createTheatreAsync, messageApi, theatreName, lat, lon, city, address])

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: 420 }}>
                <Input value={theatreName} onChange={(e) => setTheatreName(e.target.value)} style={{ marginBottom: 7 }} required placeholder="Theatre name" />
                <Input value={lat} onChange={(e) => setLat(e.target.value)} style={{ marginBottom: 7 }} required placeholder="Latitude" />
                <Input value={lon} onChange={(e) => setLon(e.target.value)} style={{ marginBottom: 7 }} required placeholder="Longitude" />
                <Input value={city} onChange={(e) => setCity(e.target.value)} style={{ marginBottom: 7 }} required placeholder="City" />
                <Input value={address} onChange={(e) => setAddress(e.target.value)} style={{ marginBottom: 7 }} required placeholder="Address" />
                <Button htmlType="submit" loading={isPending}>Submit</Button>
            </form>
        </>
        
    )
}

export default CreateTheatreForm