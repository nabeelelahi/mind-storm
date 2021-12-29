import React, { useEffect, useState } from 'react'
import { Layout } from 'antd';


const { Content } = Layout;

export default function ContentComponent({ children }) {

  const [padding, setPadding] = useState(false)

  const [width, setWidth] = useState(window.innerWidth)

  function handleResize() {
    setWidth(window.innerWidth)
  }

  function updateDimensions() {

    if (width <= 900) setPadding("12.5%")

    else setPadding(0)

  }

  useEffect(() => {

    window.addEventListener('resize', handleResize);

    window.addEventListener('load', handleResize);

  }, [])

  useEffect(() => {
    updateDimensions()
  }, [width])

  return (
    <Content className='bg-white'>
      <div
        style={{
          marginTop: padding,
          paddingTop: padding,
          padding: 0,
        }}
        className='bg-white'
      >
        {children}
      </div>
    </Content>
  )
}

