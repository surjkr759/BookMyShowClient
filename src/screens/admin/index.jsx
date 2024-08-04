import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;

import { useCurrentUser } from "../../hooks/query/user"
import CreateMovieForm from "../../components/Admin/CreateMovieForm";
import CreateTheatreForm from "../../components/Admin/CreateTheatreForm";
import CreateMovieScheduleForm from "../../components/Admin/CreateMovieScheduleForm";

const AdminPage = () => {
    const navigate = useNavigate()
    const {user, isLoading} = useCurrentUser()

    const [selectedKey, setSelectedKey] = useState('movies')

    useEffect(() => {
        if(user && user.role !== 'admin')
            navigate("/")
        else if(!user && !isLoading)
            navigate("/signin")
    }, [navigate, user, isLoading])

    if(isLoading) return <h4>Loading...</h4>

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        onClick={(e) => setSelectedKey(e.key)}
                        defaultSelectedKeys={['movies']}
                        defaultOpenKeys={['movies']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={[
                            { key: "movies", label: "Movies"},
                            { key: "theatres", label: "Theatres"},
                            { key: "movieSchedules", label: "Movie Schedules"}
                        ]}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        }}
                    >
                        {selectedKey === 'movies' && (<div><CreateMovieForm /></div>)}
                        {selectedKey === 'theatres' && (<div><CreateTheatreForm /></div>)}
                        {selectedKey === 'movieSchedules' && (<div><CreateMovieScheduleForm /></div>)}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default AdminPage