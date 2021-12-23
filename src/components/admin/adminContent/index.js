import React from 'react'
import { Layout } from 'antd';
import "./constentStyles.css"


const { Content} = Layout;

export default function ContentComponent({ children }) {
    return (
        <Content>
        <div className='main'>
         {children}
        </div>
      </Content>
    )
}

