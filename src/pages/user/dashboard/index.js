import React, { useState, useEffect } from 'react'
import { Layout } from '@components'
import { workSpace } from '@config'
import { getUser } from '@helpers'
import { http } from '@services'
import { Row, Col, message } from 'antd'
import './dashboard.css'

export default function Dashboard() {

    const [user, setUser] = useState(null)
    
    const [workSpaces, setWorkSpaces] = useState(null)

    async function getWorkSpaces() {

        const url = `user/GET/work-space/${user._id}`;
    
        const response = await http(url);
    
        console.log(response)
        if (response?.success) {
          setWorkSpaces(response.info)
        }
        else {
          message.error(response.message);
        }
      }

    useEffect(() => {
        setUser(getUser())
        getWorkSpaces()
    },[])

    return (
        <Layout>
            <div className="px-5 py-3 dashboard-section w-100 d-flex align-items-center justify-content-center">
                <div className="h-100 w-100">
                    <div className="w-100 row">
                        <div className="col-lg-8 d-flex flex-column justify-content-center">
                            <h3 className="mb-3 text-start text-secondary">Work Spaces</h3>
                            <div className="mh-75 w-100 rounded-3 bg-dark p-3">
                                <Row gutter={[16, 16]}>
                                    {
                                        workSpaces.map((item) => (
                                            <Col key={item.key} lg={8}>
                                                <div className='text-secondary workspace-card p-2 w-100 bg-white rounded-3 text-wrap'>
                                                    <h4 className='text-primary'>{item.name}</h4>
                                                    {item.discription}
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex flex-column justify-content-center">
                            <h3 className="mb-3 text-start text-secondary">Profile Details</h3>
                            <div className='bg-white w-100 mh-75 shadow d-flex flex-column align-items-center justify-content-evenly py-3'>
                                <img src="http://projects.websetters.in/digg-seos/digg/wp-content/themes/twentytwenty-child-theme/img/demo-prof.jpg"
                                    class="img-thumbnail rounded-circle w-50"
                                    alt="..."
                                />
                                <div className="row w-75">
                                    <div className="col-12">
                                        <p className="text-secondary">Name</p>
                                        <div className="user-detail-box rounded px-1 pt-2">
                                            <h6>{user?.name}</h6>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <p className="text-secondary">Email</p>
                                        <div className="user-detail-box rounded px-1 pt-2">
                                            <h6>{user?.email}</h6>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <p className="text-secondary">Phone</p>
                                        <div className="user-detail-box rounded px-1 pt-2">
                                            <h6>{user?.phone}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


