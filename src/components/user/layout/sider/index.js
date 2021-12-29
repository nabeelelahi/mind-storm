import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { 
  FileWordOutlined, 
  DashboardOutlined,
  FieldTimeOutlined,
  FolderAddOutlined,
  LogoutOutlined
 } from '@ant-design/icons';
 import { logout } from '@helpers' 

const { Sider } = Layout;

const { SubMenu } = Menu;

export default function SiderComponent({ navigate }) {


  const [collapsed, setCollapsed] = useState(false)

  const [categories, setCategories] = useState(null)

  function updateDimensions() {

    if (window.innerWidth <= 900) {
      setCollapsed(true)
    }
    else {
      setCollapsed(false)
    }

  }

  function onLogout(){
    logout()
    navigate('/')
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    window.addEventListener('load', updateDimensions);
  }, [])

  useEffect(() => {

    updateDimensions()

  }, [navigate])

  function onCollapse() {
    setCollapsed(!collapsed);
  };

  return (
    <Sider className="bg-light"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}>
      <div className="h-75 w-100 bg-light">
        {
          collapsed ?
            <h4 className="text-center text-primary py-3">MS</h4>
            :
            <h4 className="text-center text-primary py-3">Mind Storm</h4>
        }
        <Menu className="bg-light h-50 w-100 d-flex flex-column justify-content-center" mode="inline">
          <Menu.Item
            key="0"
            className="fw-bold text-secondary"
            icon={<DashboardOutlined />}
            onClick={() => navigate('/dashboard') }
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="1"
            className="fw-bold text-secondary"
            icon={<FileWordOutlined />}
            onClick={() => navigate('/work-spaces') }
            >
            My Work Spaces
          </Menu.Item>
          <Menu.Item
            key="18"
            className="fw-bold text-secondary"
            icon={<FileWordOutlined />}
            onClick={() => navigate('/joined-work-spaces') }
            >
            Joinded Work Spaces
          </Menu.Item>
          <Menu.Item
            key="15"
            className="fw-bold text-secondary"
            icon={<FieldTimeOutlined />}
            onClick={() => navigate('/sessions') }
            >
            Sessions
          </Menu.Item>
          <Menu.Item
            key="2"
            className="fw-bold text-secondary"
            icon={<FolderAddOutlined />}
            onClick={() => navigate('/create-work-space') }
          >
            Create Work Spaces
          </Menu.Item>
          <Menu.Item
            key="3"
            className="fw-bold text-secondary"
            icon={<LogoutOutlined />}
            onClick={onLogout}
          >
            Log out
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  )
}


