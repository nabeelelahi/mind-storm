import React, { useState, useEffect } from 'react'
import { Table, message, Tag, Avatar } from 'antd';
import { useNavigate } from 'react-router'
import { Layout } from '@components'
import { getUser } from '@helpers'
import { http } from '@services'
import { BASE_URL } from '@constants'
import './workSpaces.css'

export default function WorkSpaces() {

  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const [workSpaces, setWorkSpaces] = useState(null)

  useEffect(() => {
    setUser(getUser())
  }, [])

  useEffect(() => {
    getWorkSpaces()
  }, [user])

  const columns = [
    {
      title: '',
      dataIndex: 'file',
      key: 'file',
      render: (text, record) => (
        <img
          style={{ height: '12.5vh', width: '10vw', cursor: 'pointer' }}
          src={`${BASE_URL}/${text}`}
          onClick={() => navigate(`/sessions/${record._id}`)}
        />
      )
    },
    {
      title: 'Code',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Work Space Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => navigate(`/work-space/${record._id}`, { state: record })}>{text}</a>
      )
    },
    {
      title: 'No of Particpants',
      dataIndex: 'noOfParticipants',
      key: 'noOfParticpants',
    },
    {
      title: 'No of Sessions',
      dataIndex: 'noOfSessions',
      key: 'noOfSessions',
      render: (text, record) => (
        <a onClick={() => navigate(`/sessions/${record._id}`, { state: record })}>{text}</a>
      )
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: 'actions',
      render: (text, record) => (
        <Tag style={{cursor: 'pointer'}} color='red' onClick={() => deleteWorkSpace(record)}>{"DELETE"}</Tag>
      )
    },
  ];

  async function getWorkSpaces() {

    const url = `user/GET/work-space/${user._id}`;

    const response = await http(url);

    console.log(response.info)
    if (response?.success) {
      setWorkSpaces(response.info)
    }
    else {
      message.error(response.message);
    }
  }

  async function deleteWorkSpace(values) {

    const url = `user/DELETE/workSpace`;

    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await http(url, options);

    if (response?.success) {
      message.info(response.message);
      getWorkSpaces()
    }

    else message.error('Something went wrong');

  }

  return (
    <Layout>
      <div className="workspace-sention px-5 d-flex align-items-center">
        <div className="mh-100 w-100 px-2 d-flex flex-column justify-content-center">
          <h3 className="mb-3 text-start text-secondary">Your Work Spaces</h3>
          <div className="bg-light px-5 py-3 shadow h-75 w-100 d-flex flex-column justify-content-center">
            <Table
              className="w-100"
              dataSource={workSpaces}
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


