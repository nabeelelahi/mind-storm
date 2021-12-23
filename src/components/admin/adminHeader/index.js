import React from 'react'
import { Col, Layout, Typography, Row } from 'antd';
import './headerStyles.css'
import { useNavigate } from 'react-router'

const { Header } = Layout;

const { Title } = Typography;

export default function HeaderComponent() {
  const navigate = useNavigate()

  return (
    <Header className="site-layout-background-header header">
      <Row>
        <Col lg={8}>
          <Title
            onClick={() => navigate('/admin/update-password')}
            className="admin-title">Admin</Title>
        </Col>
      </Row>
    </Header>
  )
}


