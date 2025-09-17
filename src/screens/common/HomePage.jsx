import { useGetAllMovies, useSearchMovies } from "../../hooks/query/movie";
import { useCurrentUser } from "../../hooks/query/user";
import { useNavigate } from "react-router-dom"
import { Col, Row, Card, Spin, Flex, Input, Button, List, Empty, Typography } from 'antd';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import '../../App.css';
import { useState, useEffect, useRef } from "react";
import HomepageProfileMenu from "./HomepageProfileMenu";

const { Meta } = Card;
const { Search } = Input;
const { Title } = Typography

const HomePage = () => {
  const { user } = useCurrentUser();
  const { movies, isLoading: movieLoading } = useGetAllMovies();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [debounced, setDebounced] = useState('');

  // store the current debounce timer so we can cancel it on Enter
  const debounceRef = useRef(null);

  // Debounce typing for 1.5s
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebounced(searchText.trim());
      debounceRef.current = null;
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchText]);

  // React Query search
  const { data: results = [], isFetching } = useSearchMovies(debounced);

  // Immediate search on Enter / Search button
  const handleImmediateSearch = (val) => {
    const q = (val || '').trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchText(q);      // keep the input in sync
    setDebounced(q);       // trigger search immediately
  };

  if (movieLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh", width: "100vw" }}>
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    )
  }

  return (
    <div>
      <header>
        <div className="header">
          <div className="header-left">
            <img
              alt="bookmyshow"
              src="/bookmyshow.png"
              style={{ width: "138px", height: "55px", marginTop: "8px" }}
            />

            {/* WIDER SEARCH BAR */}
            <div style={{ maxWidth: 1440, margin: '0 auto 16px', padding: '0 16px' }}>
              <Search
                placeholder="Search movies by title"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleImmediateSearch}  // ← Enter / button = instant search
              />
            </div>
          </div>

          <div className="header-right">
            <div className="pointer">
              {city ? <span>{city}</span> : <span>Your City</span>}
              <DownOutlined style={{ margin: "0 8px", fontSize: '9px' }} />
            </div>
            <div className="pointer">
              {user?.firstName ?
                (
                  <div className="profile">
                    <span><HomepageProfileMenu text={user?.firstName} role={user?.role} /></span>
                  </div>
                ) :
                <Button type="primary" onClick={e => navigate('/signin')} danger>
                  Login/Register
                </Button>
              }
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="body-container">

          {/* WHEN SEARCHING: show only results */}
          {debounced ? (
            <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div style={{ width: '100%', maxWidth: 1200, padding: '0 16px' }}>
                <Title level={3} style={{ textAlign: 'center', margin: '16px 0 24px' }}>
                  Search results for: “{debounced}”
                </Title>

                <Card style={{ borderRadius: 16 }}>
                  {isFetching ? (
                    <div style={{ padding: 48, textAlign: 'center' }}>
                      <Spin />
                    </div>
                  ) : results.length === 0 ? (
                    <div style={{ padding: 48, textAlign: 'center' }}>
                      <Empty description="No results found" />
                    </div>
                  ) : (
                    <List
                      grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 4, xl: 5 }}
                      dataSource={results}
                      renderItem={(m) => (
                        <List.Item key={m._id} style={{ cursor: 'pointer' }}>
                          <Card
                            hoverable
                            style={{ borderRadius: 12, overflow: 'hidden' }}
                            cover={
                              <img
                                src={m.imageUrl}
                                alt={m.title}
                                style={{ height: 260, objectFit: 'cover' }}
                                onClick={() => navigate(`/movie/${m._id}`)}
                              />
                            }
                            onClick={() => navigate(`/movie/${m._id}`)}
                          >
                            <Card.Meta
                              title={m.title}
                              description={`${m.genre} • ${m.language}`}
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  )}
                </Card>
              </div>
            </div>
          ) : (
            // WHEN NOT SEARCHING: show homepage movies
            <div>
              <div><b>Now Playing</b></div>
              <div className="movies">
                <Row gutter={[16, 16]}>
                  {movies && movies.map((movie) =>
                    <Col xs={24} sm={24} md={12} lg={6} key={movie._id}>
                      <Card
                        hoverable
                        style={{ width: 250 }}
                        cover={<img alt={movie.title} src={movie.imageUrl} />}
                        onClick={() => navigate(`/movie/${movie._id}`)}
                      >
                        <Meta title={movie.title} description={movie.genre} />
                      </Card>
                    </Col>
                  )}
                </Row>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default HomePage;
