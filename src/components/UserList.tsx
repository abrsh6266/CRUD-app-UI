// src/components/UserList.tsx
import React, { useState } from 'react';
import { Button, Container, Table, Modal } from 'react-bootstrap';
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
      // Invalidate and refetch the 'users' query after deleting a user
      queryClient.invalidateQueries('users');
    } else {
      // Handle error
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="my-4 text-center">User List</h1>
      <Container fluid>
        <div className="mx-3 mt-3">
          <Table striped bordered hover responsive>
            <thead>
              <tr className="bg-gray-200">
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="success"
                      className="mr-2"
                      onClick={() => handleUpdate(user)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      <UserUpdateForm
        user={selectedUser}
        show={showUpdateForm}
        onClose={() => setShowUpdateForm(false)}
      />
    </div>
  );
};

export default UserList;
