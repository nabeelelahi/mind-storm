import React, { useState, useEffect } from 'react'
import { Layout, UpdateProfilePic } from '@components'
import { getUser } from '@helpers'
import { EditOutlined } from '@ant-design/icons'
import { http } from '@services'
import { useNavigate } from 'react-router'
import { BASE_URL } from '@constants'
import { message } from 'antd'

export default function Profile() {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const [visible, setVisible] = useState(null)

    useEffect(() => {
        setUser(getUser())
    }, [])

    return (
        <Layout>
            <div className="px-5 py-3 dashboard-section w-100 d-flex align-items-center justify-content-center">
                <div className="h-100 w-75">
                    <div className="w-100 row">
                        <div className="col-lg-12 d-flex flex-column justify-content-center">
                            <h3 className="mb-3 text-start text-secondary">Edit Profile</h3>
                            <div className='bg-white w-100 mh-75 shadow d-flex flex-column align-items-center justify-content-evenly py-3'>
                                <div
                                    className='dp bg-primary rounded-circle position-relative'
                                    style={{ width: '20%' }}
                                >
                                    <img
                                        src={`${BASE_URL}/${user?.file}`}
                                        class="img-thumbnail rounded-circle w-100 h-100"
                                        alt="..."
                                    />
                                    <div className="position-absolute bottom-0 end-0">
                                        <button 
                                        className="btn btn-dark rounded-pill d-flex align-items-center p-3 my-2"
                                        onClick={() => setVisible(true)}
                                        >
                                            <EditOutlined />
                                        </button>
                                    </div>
                                </div>
                                <div className="row w-50">
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
            <div className="position-absolute bottom-0 end-0">
                <button
                    class="btn btn-dark rounded-pill d-flex align-items-center p-3 px-5 my-2"
                    onClick={() => navigate('/edit-profile')}
                >
                    <EditOutlined />
                    <span className="ms-2">Edit</span>
                </button>
            </div>
            <UpdateProfilePic
                visible={visible}
                setVisible={setVisible}
            />
        </Layout>
    )
}


