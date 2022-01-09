import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Typography, message } from 'antd';
import { http } from '@services'
import { useNavigate } from 'react-router'
import { AdminLayout, Loader } from '@components'

const { Title } = Typography

export default function Queries() {

    const navigate = useNavigate()

    const [queries, setQueries] = useState(null)

    const queryMessage = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam`

    
  const dataSource = [
    {
      key: '1',
      id: '1',
      name: 'Hamze',
      email: 'hamzay@gmail.com',
      phone: '0312xxxxxxxx',
      message: queryMessage,
    },
    {
      id: '2',
      key: '2',
      name: 'Areeb',
      email: 'areeb@gmail.com',
      phone: '0345xxxxxxxx',
      message: queryMessage,
    },
  ];

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'name',
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

    async function getQueries() {
        const url = `admin/GET/sub-queries`;

        const response = await http(url);

        if (response?.success) {
            setQueries(response.info);
        }
    }

    useEffect(() => {
        getQueries()
    }, [])

    return (
        <AdminLayout>
            {/* {users === null ?
                <Loader />
                : */}
                <>
                    <Title className="admin-headings">Support Queries</Title>
                    <Table 
                    columns={columns} 
                    dataSource={queries}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.message}</p>,
                      }}
                    />
                </>
            {/* } */}
        </AdminLayout>
    )
}

