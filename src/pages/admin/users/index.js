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

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
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
    ];

    async function getUsers() {
        const url = `admin/GET/all-users`;

        const response = await http(url);

        if (response?.success) {
            response?.users?.map((item) => (
                item.key === String(item._id)
            ))
            setUsers(response.info);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <AdminLayout>
            {/* {users === null ?
                <Loader />
                : */}
                <>
                    <Title className="admin-headings">Users</Title>
                    <Table columns={columns} dataSource={users} />
                </>
            {/* } */}
        </AdminLayout>
    )
}

