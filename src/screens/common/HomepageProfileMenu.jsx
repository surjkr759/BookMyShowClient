import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom"


const HomepageProfileMenu = (props) => {
    const navigate = useNavigate()
    const [selectedKey, setSelectedKey] = useState('')
    
    const items = [
        {
            label: `Hi, ${props.text}`,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                {
                    key: 'editProfile',
                    label: 'Edit Profile',
                },
                `${props.role}` === 'admin' ?
                {
                    key: 'admin',
                    label: 'Admin Actions',
                } : '',
                {
                    key: 'logout',
                    label: 'Logout',
                },
                
            ]
        }
    ]

    const logout = () => {
        localStorage.clear()
        window.location.href='/'
    }

    return (
        <div>
            <Menu 
            mode="vertical" 
            items={items}
            onClick={(e) => setSelectedKey(e.key)}
            />

            {selectedKey === 'editProfile' && console.log('Edit Profile selected')}
            {selectedKey === 'admin' && navigate('/admin')}
            {selectedKey === 'logout' && logout()}
        </div>
    )
}

export default HomepageProfileMenu;