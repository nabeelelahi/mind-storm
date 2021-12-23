import React, { useState, useEffect } from 'react'
import { Carousel, Typography } from 'antd';
import './carouselStyles.css'

const { Title } = Typography

export default function CarouselComponent() {

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        window.addEventListener("load", handleResize)
    }, [])

    function handleResize() {
        setWidth(window.innerWidth)
    }

    return (
        <>
            {width > 900 ?
                <Carousel dotPosition="right" autoplay>
                    <div className="top-section">
                        <div className="layer">
                            <h1 className="main-heading">Alma International Trade</h1>
                        </div>
                    </div>
                    <div className="top-section1">
                        <div className="layer1">
                            <h1 className="main-heading">Alma International Trade</h1>
                        </div>
                    </div>
                    <div className="top-section2">
                        <div className="layer1">
                            <h1 className="main-heading">Alma International Trade</h1>
                        </div>
                    </div>
                </Carousel>
                :
                <div className="top-section-mobile">
                    <div className="layer-mobile">
                        <Title
                            level={1}
                            className="mobile-heading">Alma International Trade</Title>
                    </div>
                </div>
            }
        </>
    )
}



