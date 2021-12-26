import React from 'react'
import { Table } from 'antd';
import { Layout } from '@components'
import { workSpace } from '@config'
import './workSpaces.css'

  const columns = [
    {
      title: 'Work Space Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'No of Particpants',
      dataIndex: 'noOfParticpants',
      key: 'noOfParticpants',
    },
    {
      title: 'No of Sessions',
      dataIndex: 'noOfSessions',
      key: 'noOfSessions',
    },
  ];

export default function WorkSpaces() {
    return (
        <Layout>
            <div className="workspace-sention px-5 d-flex align-items-center">
                <div className="mh-100 w-100 px-2 d-flex flex-column justify-content-center">
                    <h3 className="mb-3 text-start text-secondary">Work Space List</h3>
                    <div className="bg-light px-5 py-3 shadow h-75 w-100 d-flex flex-column justify-content-center">
                    <Table 
                    className="w-100" 
                    dataSource={workSpace} 
                    columns={columns}
                    expandable={{
                      expandedRowRender: record => <p style={{ margin: 0 }}>{record.discription}</p>,
                    }}
                    />
                    </div>
                </div>
            </div>
        </Layout>
    )
}


