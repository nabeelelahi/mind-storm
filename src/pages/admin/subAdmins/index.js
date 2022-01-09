import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Typography, message } from 'antd';
import { http } from '@services'
import { useNavigate } from 'react-router'
import { AdminLayout, Loader } from '@components'

const { Title } = Typography

export default function SubAdmin() {

    const navigate = useNavigate()

    const [admins, setAdmins] = useState(null)

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
    ];

    async function getAdmins() {
        
        const url = `admin/GET/sub-admins`;

        const response = await http(url);

        if (response?.success) {
            setAdmins(response.info);
        }
    }

    useEffect(() => {
        getAdmins()
    }, [])

    return (
        <AdminLayout>
            {/* {users === null ?
                <Loader />
                : */}
                <>
                    <Title className="admin-headings">Sub Admins</Title>
                    <Table columns={columns} dataSource={admins} />
                </>
            {/* } */}
        </AdminLayout>
    )
}

