import { useGetAllMovies } from "../../hooks/query/movie";
import { useCurrentUser } from "../../hooks/query/user";
import { useNavigate } from "react-router-dom"
import { Col, Row, Card, Spin, Flex, Input, Button } from 'antd';
import { LoadingOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import '../../App.css';
import { useState } from "react";
import userImage from '../../assets/user.png';

const { Meta } = Card;

const HomePage = () => {
    const { user } = useCurrentUser()
    const { movies, isLoading: movieLoading } = useGetAllMovies()
    const navigate = useNavigate()
    const [city, setCity] = useState(null)

    if(movieLoading) {
        return (
            <Flex justify="center" align="center" style={{height: "100vh", width: "100vw" }}>
                <Spin
                    indicator={
                        <LoadingOutlined
                        style={{
                            fontSize: 48,
                        }}
                        spin
                        />
                    }
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
                            style={{width: "138px", height: "55px", marginTop: "8px"}}
                        />
                        <Input placeholder="Search for Movies" prefix={<SearchOutlined style={{margin: "0 8px 0 4px"}}/>} style={{height: "35px", width: "480px"}}/>
                    </div>
                    <div className="header-right">
                        <div className="pointer">
                            {city? <span>city</span> : <span>Your City</span>}
                            <DownOutlined style={{ margin: "0 8px", fontSize: '9px'}}/>
                        </div>
                        <div className="pointer">
                            {user?.firstName ? 
                                (
                                    <div className="profile" >
                                        <img alt="user" src={userImage} width="40px" height="40px" />
                                        <span>Hi, {user?.firstName}</span>
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
                    <div>
                        <div><b>Now Playing</b></div>
                    </div>
                    <div className="movies">
                        <Row>
                            {movies && movies?.map((movie) => 
                                <Col xs={24} sm={24} md={12} lg={8} key={movie._id}>
                                    {/* <div onClick={(e) => navigate(`/movie/${movie._id}`)}> */}
                                        <Card
                                            hoverable
                                            style={{ width: 250 }}
                                            cover={<img alt="example" src={movie.imageUrl} />}
                                            onClick={(e) => navigate(`/movie/${movie._id}`)}
                                        >
                                            <Meta title={movie.title} description={movie.genre} />
                                        </Card>
                                    {/* </div> */}
                                </Col>
                            )}
                        </Row>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomePage