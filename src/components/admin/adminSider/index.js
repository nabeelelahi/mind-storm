import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router'
import './siderStyle.css'

const { Sider } = Layout;
const { SubMenu } = Menu;


export default function SiderComponent() {

  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)

  function updateDimensions() {

    if (window.innerWidth <= 900) {
      setCollapsed(true)
    }
    else {
      setCollapsed(false)
    }

  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    window.addEventListener('load', updateDimensions);

  }, [])

  function onCollapse() {
    setCollapsed(!collapsed);
  };


  return (
    <Sider className="sider-body" collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu theme='dark' mode="inline">
        <Menu.Item key="1" onClick={() => navigate('/admin')}>
          View Users
        </Menu.Item>
        <Menu.Item key="2" className="menu-item" onClick={() => navigate('/admin/sub-admin')}>
          Sub Admin
        </Menu.Item>
        <Menu.Item key="3" className="menu-item" onClick={() => navigate('/admin/add-sub-admin')}>
          Add New Admin
        </Menu.Item>
        <Menu.Item key="4" onClick={() => navigate('/admin/queries')}>
          Support Queries
        </Menu.Item>
        <Menu.Item key="5">
          Logout
        </Menu.Item>
      </Menu>

    </Sider>
  )
}


