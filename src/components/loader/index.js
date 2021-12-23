import React from 'react'
import { Spin, Row, Col } from 'antd';

export default function Loader({ size }) {
    return (
        <>
            {
                size === "small" ?
                    <Row >
                        <Col lg={{ offset: 10, span: 6 }} >
                            <Spin />
                        </Col>
                    </Row>
                    :
                    <div className="container">
                        <Row className='product-cont'>
                            <Col lg={{ offset: 10, span: 6 }} >
                                <Spin size="large" />
                            </Col>
                        </Row>
                    </div>
            }

        </>
            )
}


