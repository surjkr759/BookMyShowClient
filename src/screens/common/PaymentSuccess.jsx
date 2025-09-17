import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiV1Instance } from '../../api';
import { message, Spin } from 'antd';

const PaymentSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const sessionId = params.get('session_id');
    if (!sessionId) {
      message.error('Missing session_id');
      navigate('/');
      return;
    }

    (async () => {
      try {
        const { data } = await apiV1Instance.get(`/movieSchedule/checkout/success`, {
          params: { session_id: sessionId }
        });
        if (data?.status === 'success') {
          message.success('Booking confirmed!');
          navigate('/bookings');
        } else {
          message.error(data?.message || 'Payment not confirmed');
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        message.error('Could not confirm payment');
        navigate('/');
      }
    })();
  }, [search, navigate]);

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'60vh'}}>
      <Spin tip="Finalizing your booking..." />
    </div>
  );
};

export default PaymentSuccess;
