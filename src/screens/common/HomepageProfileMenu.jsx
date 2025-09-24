import React from 'react'
import { Dropdown, Avatar, Space, Typography } from 'antd'
import { UserOutlined, LogoutOutlined, SettingOutlined, ProfileOutlined, ToolOutlined  } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

const HomepageProfileMenu = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const items = [
    ...(user?.role === 'admin' ? [{
        key: 'admin',
        icon: <ToolOutlined />,
        label: 'Admin Actions',
        onClick: () => navigate('/admin')
    }] : []),
    ...(user?.role === 'admin' ? [{ type: 'divider' }] : []),


    {
      key: 'bookings',
      icon: <ProfileOutlined  />,
      label: 'My Bookings',
      onClick: () => navigate('/bookings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'profile',
      icon: <SettingOutlined />,
      label: 'Edit Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ color: '#ff4d4f' }} />,
      label: <span style={{ color: '#ff4d4f' }}>Logout</span>,
      onClick: onLogout,
    },
  ]

  return (
    <Dropdown
      trigger={['click']}
      menu={{ items }}
      placement='bottomRight'
      arrow
    >
      <Space style={{ cursor: 'pointer' }}>
        <Avatar size="small" icon={<UserOutlined />} />
        <Text strong>
            Hi, {user?.firstName || user?.email || 'User'}
        </Text>
      </Space>
    </Dropdown>
  )
}

export default HomepageProfileMenu
