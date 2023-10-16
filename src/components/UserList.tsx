import React, { useState } from 'react';
import { Button, Table, Space } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import UserUpdateForm from './UserUpdateForm';

const UserList: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const { data: users, isLoading } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    return data;
  });

  const deleteUserMutation = useMutation(async (userId: number) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      queryClient.invalidateQueries('users');
    } else {
      console.error('Error deleting user');
    }
  });

  const handleUpdate = (user: any) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
  };

  const handleDelete = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, user: any) => (
        <Space>
          <Button type="primary" onClick={() => handleUpdate(user)}>
            Update
          </Button>
          <Button onClick={() => handleDelete(user.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="my-4 text-center">User List</h1>
      <Table dataSource={users} columns={columns} bordered rowKey="id" />

      <UserUpdateForm
        user={selectedUser}
        show={showUpdateForm}
        onClose={() => setShowUpdateForm(false)}
      />
    </div>
  );
};

export default UserList;
