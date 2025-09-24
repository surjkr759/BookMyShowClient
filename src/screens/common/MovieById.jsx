import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { useGetMovieById, useSearchMovies } from "../../hooks/query/movie";
import { Card, Button, Flex, Input, Spin, Typography, List, Empty, Dropdown } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { useCurrentUser } from "../../hooks/query/user";
import { useGetAllCities } from '../../hooks/query/theatre';
import HomepageProfileMenu from "./HomepageProfileMenu";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { useCity } from '../../context/CityContext';
import { useGetMovieSchedules } from "../../hooks/query/movieSchedule"; // schedules hook

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const { Search } = Input;
const { Title } = Typography;

const MovieById = () => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const { city, setCity } = useCity();

  // Movie details
  const { movie, isLoading } = useGetMovieById(id);

  // Schedules (ALWAYS read .data and give it a default array so hooks can run every render)
  const { data: movieScheduleData = [], isLoading: movieScheduleLoading } =
    useGetMovieSchedules(id, city);

  // Cities list for dropdown
  const { data: cities = [] } = useGetAllCities();

  // Search state + debounce (hooks at top-level only; no conditionals)
  const [searchText, setSearchText] = useState('');
  const [debounced, setDebounced] = useState('');
  const debounceRef = useRef(null);

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

  // Search hook — always called; `enabled` is handled inside your hook
  const { data: searchResults = [], isFetching } = useSearchMovies(debounced, city);

  const handleImmediateSearch = (val) => {
    const q = (val || '').trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchText(q);
    setDebounced(q);
  };

  // City dropdown menu (no hooks inside)
  const cityMenu = {
    items: (cities || []).map(c => ({
      key: c,
      label: c,
      onClick: () => {
        setCity(c);
        try { localStorage.setItem('city', c); } catch {}
      }
    }))
  };

  // ⬇️ IMPORTANT: All hooks (including useMemo) must be called before any early return

  // Sort and group schedules (safe to compute even during loading because movieScheduleData has a default [])
  const sorted = useMemo(() => (
    [...movieScheduleData]
      .filter(s => new Date(s.startTime) > new Date())
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
  ), [movieScheduleData]);

  const groupsMap = useMemo(() => {
    return sorted.reduce((acc, s) => {
      const key = dayjs(s.startTime).format('YYYY-MM-DD');
      (acc[key] ||= []).push(s);
      return acc;
    }, {});
  }, [sorted]);

  const orderedKeys = useMemo(() => Object.keys(groupsMap).sort(), [groupsMap]);

  const humanLabel = (yyyyMmDd) => {
    const d = dayjs(yyyyMmDd, 'YYYY-MM-DD');
    if (d.isToday()) return 'Today';
    if (d.isTomorrow()) return 'Tomorrow';
    return d.format('ddd, DD MMM');
  };

  // ✅ Early return AFTER all hooks are called
  if (isLoading || movieScheduleLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: "60vh", width: "100%" }}>
        <Spin />
      </Flex>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <header>
        <div className="header">
          <div className="header-left" style={{ display: "flex", alignItems: "center" }}>
            <img
              alt="bookmyshow"
              src="/bookmyshow.png"
              style={{ width: "138px", height: "55px", marginTop: "8px", cursor: "pointer" }}
              onClick={() => navigate('/')}
            />
            <div style={{ maxWidth: 1440, margin: '0 auto 16px', padding: '0 16px' }}>
              <Search
                placeholder="Search movies by title"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleImmediateSearch}
              />
            </div>
          </div>

          <div className="header-right">
            <Dropdown menu={cityMenu} placement="bottom">
              <div className="pointer">
                <span>{city || 'Delhi'}</span>
                <DownOutlined style={{ margin: "0 8px", fontSize: '9px'}}/>
              </div>
            </Dropdown>
            <div className="pointer">
              {user?.firstName ? (
                <div className="profile">
                  <span><HomepageProfileMenu user={user} /></span>
                </div>
              ) : (
                <Button type="primary" onClick={() => navigate('/signin')} danger>
                  Login/Register
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
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
              ) : searchResults.length === 0 ? (
                <div style={{ padding: 48, textAlign: 'center' }}>
                  <Empty description="No results found" />
                </div>
              ) : (
                <List
                  grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 4, xl: 5 }}
                  dataSource={searchResults}
                  renderItem={(m) => (
                    <List.Item key={m._id} style={{ cursor: 'pointer' }}>
                      <Card
                        hoverable
                        style={{ borderRadius: 12, overflow: 'hidden' }}
                        cover={
                          <img
                            src={m.imageUrl || m.posterUrl || m.poster || m.image}
                            alt={m.title}
                            style={{ height: 260, objectFit: 'cover' }}
                            onClick={() => navigate(`/movie/${m._id}`)}
                          />
                        }
                        onClick={() => navigate(`/movie/${m._id}`)}
                      >
                        <Card.Meta
                          title={m.title}
                          description={[m.genre, m.language].filter(Boolean).join(' • ')}
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
        <>
          {/* MOVIE DETAILS */}
          <Flex justify="left" style={{ margin: "50px 0px 10px 100px" }}>
            <Card
              hoverable
              style={{ width: 250, marginRight: "40px" }}
              cover={<img alt={movie?.title} src={movie?.imageUrl || movie?.posterUrl || movie?.poster} height="400px" />}
            />
            <Flex vertical style={{ marginTop: "20px" }}>
              <h1>{movie?.title}</h1>
              <div className="movieDetails">{movie?.language}</div>
              <div className="movieDetails">
                {movie?.genre} • {movie?.releaseDate ? movie.releaseDate.slice(0, 10) : ""}
              </div>
              <h3>About The Movie</h3>
              <div className="movieDetails" style={{ width: "900px" }}>{movie?.description}</div>
              <br />
              <h2>Book Tickets ↓</h2>
            </Flex>
          </Flex>

          {/* GROUPED SHOWTIMES */}
          <div style={{ margin: "30px 100px" }}>
            {orderedKeys.length === 0 && (
              <div style={{ textAlign: 'center', color: '#888', padding: '24px 0' }}>
                No shows available{city ? ` in ${city}` : ""}.
              </div>
            )}
            {orderedKeys.map((key) => (
              <div key={key} style={{ marginBottom: 32 }}>
                <h2 style={{ margin: '16px 0' }}>{humanLabel(key)}</h2>

                <Flex gap="middle" wrap>
                  {groupsMap[key].map(e => (
                    <div key={e._id}>
                      <Card style={{ width: 300 }}>
                        <p><b>{e.theatre?.theatreName || e.theatreName || 'Theatre'}</b></p>
                        <p>{new Date(e.startTime).toLocaleString()}</p>
                        <p>
                          Price: {Number(e.price).toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                          })}
                        </p>
                        <Button onClick={() => {
                          if (user) navigate('/copy_card', { state: { scheduleId: e._id } });
                          else {
                            navigate('/login_error');
                            setTimeout(() => navigate('/signin'), 2000);
                          }
                        }}>Book Show</Button>
                      </Card>
                    </div>
                  ))}
                </Flex>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieById;
