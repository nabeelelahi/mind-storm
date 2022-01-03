import React, { useState, useEffect } from 'react'
import { Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Layout, JoinWorkSpaceModal } from '@components'
import { useNavigate } from 'react-router';
import { workSpace } from '@config'
import { getUser } from '@helpers'
import { http } from '@services'

export default function JoinedWorkSpaces() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [workSpaces, setWorkSpaces] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setUser(getUser())
  }, [])

  useEffect(() => {
    getWorkSpaces()
  }, [user])

  async function getWorkSpaces() {

    const url = `user/GET/joined-workspace/${user.email}`;

    const response = await http(url);

    console.log(response)
    if (response?.success) {
      setWorkSpaces(response.info)
    }
    else {
      message.error("Username or Password is incorrect");
    }
  }

  const columns = [
    {
      title: 'Work Space Name',
      dataIndex: 'name',
      key: 'name',
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
        <a onClick={() => navigate(`/sessions/${record._id}`, { state: record})}>{text}</a>
      )
    },
  ];

  return (
    <Layout>
      <div className="workspace-sention px-5 d-flex align-items-center">
        <div className="mh-100 w-100 px-2 d-flex flex-column justify-content-center">
          <h3 className="mb-3 text-start text-secondary">Joinded Work Spaces</h3>
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
      <div className="position-absolute bottom-0 end-0">
        <button
          class="btn btn-primary rounded-pill d-flex align-items-center p-3 px-5 my-2"
          onClick={() => setVisible(true)}
        >
          <PlusOutlined />
          <span className="ms-2">Join new Workspace</span>
        </button>
      </div>
      <JoinWorkSpaceModal
        visible={visible}
        setVisible={setVisible}
        getWorkSpaces={getWorkSpaces()}
      />
    </Layout>
  )
}


