import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { CardComponent } from '@components'
import { Typography } from 'antd';
import { http } from '@services'
import './bestSellingStyles.css'
import "slick-carousel/slick/slick.css";

const { Title } = Typography;

export default function BestSellingProducts({ navigate }) {

    const [width, setWidth] = useState(window.innerWidth)

    const [products, setProducts] = useState(null)

    async function getProducts() {
        const url = `user/GET/products/Best`;

        const response = await http(url);

        if (response?.success) {
            setProducts(response?.products);
        }
    }

    useEffect(() => {
        getProducts()
        window.addEventListener("resize", handleResize)
        window.addEventListener("load", handleResize)
    }, [])


    function redirect(product) {
        navigate(`/products/${product?._id}`, { state: product })
    }

    function handleResize() {
        setWidth(window.innerWidth)
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: width < 1250 && width > 800 ? 2 : width < 800 ? 1 : products?.length === 2 ? 2 : products?.length === 1 ? 1 : 3,
        slidesToScroll: 1
    };

    return (
        <div className='container'>
            {
                products?.length ?
                    <>
                        <Title level={width > 800 ? 1 : 3} >Best Selling Products</Title>
                        <Slider {...settings}>
                            {
                                products?.map((product, index) => {
                                    return (
                                        <div key={String(product._id)} className='column' onClick={() => redirect(product)}>
                                            <CardComponent product={product} />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </>
                    :
                    <></>
            }
        </div>
    )
}

