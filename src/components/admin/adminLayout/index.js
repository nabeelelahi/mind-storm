import React from 'react'
import { Layout } from 'antd';
import SiderComponent from '../adminSider'
import HeaderComponent from '../adminHeader'
import ContentComponent from '../adminContent'
import FooterComponent from '../adminFooter'

export default function AdminLayout({ children }) {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* sider */}
            <SiderComponent />
            <Layout className="site-layout">
                {/* header */}
                <HeaderComponent />
                {/* content */}
                <ContentComponent>
                    {children}
                </ContentComponent>
                {/* footer */}
                <FooterComponent />
            </Layout>
        </Layout>
    );
}
