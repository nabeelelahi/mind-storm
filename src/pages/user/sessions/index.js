import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router'
import { Table, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Layout, CreateSessionModal } from '@components'
import { getUser } from '@helpers'
import { http } from '@services'

export default function Sessions() {

    const location = useLocation()

    const workSpaceDetails = location.state

    const { workspaceId } = useParams()

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    
    const [visible, setVisible] = useState(false)

    const [sessions, setSessions] = useState(null)

    useEffect(() => {
        getSessions()
        setUser(getUser())
    }, [])

    const columns = [
        {
            title: 'Session Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a onClick={() => navigate(`/session/brain-writing/${record._id}`, { state: record })}>{text}</a>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <Tag color={text === 'active' ? 'green' : 'red'}>{text.toUpperCase()}</Tag>
        },
    ];

    async function getSessions() {

        const url = `user/GET/session/${workspaceId}`;

        const response = await http(url);

        console.log(response.info)
        if (response?.success) {
            setSessions(response.info)
        }
        else {
            message.error(response.message);
        }
    }

    return (
        <Layout>
            <div className="workspace-sention px-5 d-flex align-items-center">
                <div className="mh-100 w-100 px-2 d-flex flex-column justify-content-center">
                    <h3 className="mb-3 text-start text-secondary">Sessions List</h3>
                    <div className="bg-light px-5 py-3 shadow h-75 w-100 d-flex flex-column justify-content-center">
                        <Table className="w-100" dataSource={sessions} columns={columns} />
                    </div>
                </div>
            </div>
            {
                workSpaceDetails?.userId === user?._id &&
                <div className="position-absolute bottom-0 end-0">
                    <button
                        class="btn btn-dark rounded-pill d-flex align-items-center p-3 px-5 my-2"
                        onClick={() => setVisible(true)}
                    >
                        <PlusOutlined />
                        <span className="ms-2">Start an instant Session</span>
                    </button>
                </div>
            }
            <CreateSessionModal
                visible={visible}
                setVisible={setVisible}
                getSessions={getSessions}
            />
        </Layout>
    )
}


