import { useEffect, useState } from 'react';
import { apiV1Instance } from '../../api';
import { useCurrentUser } from '../../hooks/query/user';
import { Card, List, Button, Tag, Typography, Space, Avatar, Row, Col } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined, EnvironmentOutlined, NumberOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const BookingCard = ({ booking }) => {
  const sch = booking.schedule;
  const movie = sch?.movie;
  const theatre = sch?.theatre;

  const when = sch?.startTime ? dayjs(sch.startTime).format('ddd, DD MMM YYYY • hh:mm A') : '';
  const poster = movie?.imageUrl || '/placeholder.png';

  return (
    <Card
      bodyStyle={{ padding: 16 }}
      style={{
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 6px 14px rgba(0,0,0,0.05)'
      }}
    >
      <Row gutter={16} align="middle">
        <Col xs={6} sm={5} md={4} lg={3}>
          <Avatar shape="square" src={poster} alt={movie?.title} size={84} />
        </Col>
        <Col xs={18} sm={19} md={20} lg={21}>
          <Space direction="vertical" size={2} style={{ width: '100%' }}>
            <Space align="baseline" wrap>
              <Title level={4} style={{ margin: 0 }}>{movie?.title || 'Movie'}</Title>
              <Tag color="geekblue">{movie?.genre}</Tag>
            </Space>
            <Space size="middle" wrap>
              <Text><ClockCircleOutlined /> {when}</Text>
              {theatre?.name && (
                <Text><EnvironmentOutlined /> {theatre.name}</Text>
              )}
              {booking.transactionId && (
                <Text type="secondary"><NumberOutlined /> {booking.transactionId}</Text>
              )}
            </Space>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

const MyBookings = () => {
  const { user } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiV1Instance.get('/movieSchedule/bookings/me');
        setBookings(data?.data?.bookings || []);
      } catch (err) {
        console.error(err);
        // If not authenticated, send to sign-in
        if (err?.response?.status === 401) {
            message.warning('Please sign in to view your bookings.')
            window.location.href = '/signin'
            return
        }
        message.error('Failed to load bookings')
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ maxWidth: 920, margin: '24px auto', padding: '0 16px' }}>
      {/* Top bar: user at right */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>My Bookings</Title>
        <Space>
          <UserOutlined />
          <Text strong>
            {user?.firstName ? `${user.firstName} ${user?.lastName || ''}` : (user?.email || 'User')}
          </Text>
        </Space>
      </div>

      {/* Centered Back button */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom: 16 }}>
        <Button
          type="primary"
          size="large"
          shape="round"
          icon={<ArrowLeftOutlined />}
          onClick={() => (window.location.href = '/')}
        >
          Back to Home
        </Button>
      </div>

      <Card loading={loading} style={{ borderRadius: 16 }}>
        {(!loading && bookings.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Title level={4} style={{ marginBottom: 8 }}>No bookings yet</Title>
            <Text type="secondary">Once you book a show, your tickets will appear here.</Text>
          </div>
        ) : (
          <List
            dataSource={bookings}
            renderItem={(b) => <BookingCard booking={b} />}
          />
        )}
      </Card>
    </div>
  );
};

export default MyBookings;
