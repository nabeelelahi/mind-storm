import React from 'react'
import { Table, Button } from 'antd';
import { PlusOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout } from '@components'
import { sessions } from '@config'

const columns = [
    {
        title: 'Session Id',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Work Space Name',
        dataIndex: 'workSpaceName',
        key: 'workSpaceName',
    },
    {
        title: 'No of Particpants',
        dataIndex: 'noOfParticpants',
        key: 'noOfParticpants',
    },
];

export default function Sessions() {
    return (
        <Layout>
            <div className="workspace-sention px-5 d-flex align-items-center">
                <div className="mh-100 w-100 px-2 d-flex flex-column justify-content-center">
                    <h3 className="mb-3 text-start text-secondary">Sessions List</h3>
                    <div className="bg-light px-5 py-3 shadow h-75 w-100 d-flex flex-column justify-content-center">
                        <Table
                            className="w-100"
                            dataSource={sessions}
                            columns={columns}
                            expandable={{
                                expandedRowRender: record => <p style={{ margin: 0 }}>{record.discription}</p>,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="position-absolute bottom-0 end-0">
                <button class="btn btn-dark rounded-pill d-flex align-items-center p-3 px-5">
                    <LoginOutlined />
                    <span className="ms-2">Join an Existing Session</span>
                </button>
                <button class="btn btn-primary rounded-pill d-flex align-items-center p-3 px-5 my-2">
                    <PlusOutlined />
                    <span className="ms-2">Start an instant Session</span>
                </button>
            </div>
        </Layout>
    )
}


