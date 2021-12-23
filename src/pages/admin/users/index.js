import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Typography, message } from 'antd';
import { http } from '@services'
import { useNavigate } from 'react-router'
import { AdminLayout, Loader } from '@components'
import "./viewUserStyles.css"

const { Title } = Typography

export default function Users() {

    const navigate = useNavigate()

    const [users, setUsers] = useState(null)

    
  const dataSource = [
    {
      key: '1',
      id: '1',
      name: 'Hamze',
      email: 'hamzay@gmail.com',
      phone: '0312xxxxxxxx',
      workSpace: 'Dummy Space',
      DoB: '16/10/20'
    },
    {
      id: '2',
      key: '2',
      name: 'Areeb',
      email: 'areeb@gmail.com',
      phone: '0345xxxxxxxx',
      workSpace: 'Dummy Space',
      DoB: '01/07/20'
    },
  ];

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="#">{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'DoB',
            key: 'DoB',
        },
        {
            title: 'Work Space',
            dataIndex: 'workSpace',
            key: 'workSpace',
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tag onClick={() => deleteUser(text)} color='red'>
                        Delete
                    </Tag>
                </Space>
            ),
        },
    ];

    async function deleteUser(text) {
        const url = `admin/DELETE/user/${text}`;

        const options = {
            method: "DELETE",
        };

        const response = await http(url, options);

        if (response?.success) {
            message.info("User Deleted Successfully");
            getUsers()
        }
    }

    async function checkForAmin() {
        let currentUser = await JSON.parse(sessionStorage.getItem("user"))

        if (currentUser?.type !== "admin") navigate("/admin/login")
    }

    async function getUsers() {
        const url = `admin/GET/users`;

        const response = await http(url);

        if (response?.success) {
            response?.users?.map((item) => (
                item.key === String(item._id)
            ))
            setUsers(response.users);
            console.log(response.users);
        }
    }


    useEffect(() => {
        // checkForAmin()
        getUsers()
    }, [])

    return (
        <AdminLayout>
            {/* {users === null ?
                <Loader />
                : */}
                <>
                    <Title className="admin-headings">Users</Title>
                    <Table columns={columns} dataSource={dataSource} />
                </>
            {/* } */}
        </AdminLayout>
    )
}

