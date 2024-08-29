import '../../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMovieScheduleBookingUrl } from '../../hooks/query/movieSchedule';
import { Button } from 'antd';
import { useCallback, useState } from 'react';
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";

const CopyCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    // console.log('Selected Schedule id: ', location.state?.scheduleId)
    const { url } = useGetMovieScheduleBookingUrl(location.state?.scheduleId)
    console.log('URL', url)

    const copyToClipboard = useCallback((text) => {
        navigator.clipboard.writeText(text)
        .then(() => console.log('Text copied to clipboard', text))
        .catch((err) => console.log('Err=>', err))

        setCopied(true)
    }, [copied])


    return (
        <div className="container">
            <h3>Please use below Test Card credentials for doing the payment</h3>
            <div>Card number: 4242424242424242 &nbsp; &nbsp;
                {copied ? <TbCopyCheckFilled /> :
                    <TbCopy onClick={(e) => copyToClipboard('4242424242424242')} />
                }</div>
            <div>CVC: Any 3 digits</div>
            <div>Date: Any future date</div>
            <Button onClick={(e) => {window.location.href = url}}>Proceed to Checkout</Button>
        </div>
    )
}

export default CopyCard