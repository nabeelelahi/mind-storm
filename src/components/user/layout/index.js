import React from 'react'
import { Layout } from 'antd';
import { useNavigate } from 'react-router'
import SiderComponent from '../sider'
import HeaderComponent from '../header'
import ContentComponent from '../content'
import FooterComponent from '../footer'

export default function LayoutComponent({ children }) {

    const navigate = useNavigate()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* sider */}
            <SiderComponent navigate={navigate} />
            <Layout className="site-layout">
                {/* header */}
                <HeaderComponent navigate={navigate} />
                {/* content */}
                <ContentComponent>
                    {children}
                </ContentComponent>
                {/* footer */}
                <FooterComponent navigate={navigate} />
            </Layout>
        </Layout>
    );
}
