import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useQueryClient } from 'react-query';

interface UserUpdateFormProps {
  user: any | null;
  show: boolean;
  onClose: () => void;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ user, show, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
      });
    }
  }, [user]);

  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        queryClient.invalidateQueries('users');
        console.log('User updated successfully!');
      } else {
        console.error('Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }

    onClose();
  };

  return (
    <Modal 
    title="Update User" 
    open={show} 
    onCancel={onClose} 
    footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Form>
        <Form.Item label="Name">
          <Input
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Password">
          <Input
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserUpdateForm;
